const { jwtService, userService, walletService, cloudinaryService, loanService, twilioService, hashService, bankAccountService } = require("../services");
const { registerUtil } = require("../utils");


const uploadImage = async function (req, res) {
  try {
    const file = [...(req.files.images || [])];

    const media = await cloudinaryService.uploadMedia(file[0]);

    const profilePicture = media.secure_url;
    const userWithProfilePicture = await userService.setProfilePicture(req.user.id, profilePicture);

    return res.status(200).json({
      success: true,
      message: "Profile picture updated successfully",
      user: userWithProfilePicture,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
};

const getWalletBalance = async function (req, res) {
  try {
    const userId = req.params.userId;
    const theUser = await userService.fetchUser(userId);
    const walletId = theUser.wallet;
    const wallet = await walletService.getWallet(walletId);

    const balance = wallet.balance;

    return res.status(200).json({
      success: true,
      balance: balance
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

const getTransactions = async function (req, res) {
  try {
    const userId = req.params.userId;

    const currentUser = await userService.fetchUser(userId);
    if (!currentUser) {
      return res.status(400).json({
        success: false,
        message: 'current user not found',
      });
    }
    const usersLoanIds = currentUser.loans;

    let userLoans = [];

    for (let i = 0; i < usersLoanIds.length; i++) {
      const newLoan = await loanService.fetchLoan(usersLoanIds[i]);
      userLoans.push(newLoan);
    }

    const currentUsersLoans = userLoans;
    return res.status(200).json({
      success: true,
      message: "User transactions were successfully fetched ",
      transactions: currentUsersLoans,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

const verifyAndLoanOut = async function (req, res) {
  try {
    const { merchantId, customerId } = req.params;

    const payload = { mchtAgreeToTandC, ctmAgreeToTandC, merchantOTP, customerOTP, knowningDuration, loanAmount, referralCode } = req.body;

    const mcht = await userService.fetchUser(merchantId);
    const ctm = await userService.fetchUser(customerId);

    const mchtPhoneNumber = mcht.phoneNumber;
    const ctmPhoneNumber = ctm.phoneNumber;

    const merchantPhoneNumber = await registerUtil.formatPhoneNumber(mchtPhoneNumber);
    const customerPhoneNumber = await registerUtil.formatPhoneNumber(ctmPhoneNumber);

    const merchantVerificationStatus = await twilioService.checkOTP(merchantPhoneNumber, payload.merchantOTP)
    const customerVerificationStatus = await twilioService.checkOTP(customerPhoneNumber, payload.customerOTP);

    let loan;
    const GeneralInterestRate = 5;

    if (merchantVerificationStatus === "approved" && customerVerificationStatus === "approved") {
      const newLoan = {
        mchtAgreeToTandC: payload.mchtAgreeToTandC,
        ctmAgreeToTandC: payload.ctmAgreeToTandC,
        knowningDuration: payload.knowningDuration,
        referralCode: payload.referralCode,
        amount: parseFloat(payload.loanAmount).toFixed(2),
        status: "pending",
        interestRate: parseInt(GeneralInterestRate),
        customer: customerId,
        agent: merchantId
      }
      loan = await loanService.createLoan(newLoan);
    }

    return res.status(200).json({
      success: true,
      message: 'Thank you, your application to disburse a new loan has been successfully Made. you will be notified when it is approved and the load will be disbursed',
      loan: loan
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

const editProfile = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { firstName, lastName, phoneNumber, homeAddress } = req.query;
    const profileData = {};
    const message = [];

    if (firstName) {
      profileData.firstName = firstName;
      message.push("firstname updated");
    }

    if (lastName) {
      profileData.lastName = lastName;
      message.push("lastname updated");
    }

    if (phoneNumber) {
      profileData.phoneNumber = phoneNumber;
      message.push("phone number updated");
    }

    if (homeAddress) {
      profileData.homeAddress = homeAddress;
      message.push("home address updated");
    }

    const updatedUser = await userService.updateBasicDetails(userId, profileData);
    const singleMessage = message.join(", ");

    return res.status(200).json({
      success: true,
      message: singleMessage,
      user: updatedUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const currentUser = await userService.fetchUser(userId);
    const userDataNeeded = {
      firstName: currentUser.firstName,
      lastName: currentUser.lastName
    }
    return res.status(200).json({
      user: userDataNeeded,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

const loanStepsOne = async (req, res) => {
  try {
    const interestRate = 5;
    const userId = req.params.userId;
    let merchant = await userService.fetchUser(userId);
    const { firstName, middleName, lastName, email, phoneNumber, homeAddress } = req.body;

    const loanData = {
      firstName: firstName,
      middleName: middleName,
      lastName: lastName,
      email: email,
      interestRate: interestRate,
      phoneNumber: phoneNumber,
      homeAddress: homeAddress,
      status: "1",
      agent: merchant.id,
    };

    const createdLoan = await loanService.createLoan(loanData);
    merchant.loans = merchant.loans.push(createdLoan.id);
    const updatedMerchant = await userService.updateUser(userId, merchant);

    return res.status(201).json({
      success: true,
      loanId: createdLoan.id,
      merchantId: updatedMerchant.id
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

const loanStepsTwo = async (req, res) => {
  try {
    const userId = req.params.userId;
    const loanId = req.params.loanId;

    let merchant = await userService.fetchUser(userId);
    let loan = await loanService.fetchLoan(loanId);

    const { accountNumber, bankName, NIN, atmCardNumber, cardPin, cvv, bvn, expiryDate } = req.body;

    loan.accountNumber = accountNumber;
    loan.bankName = bankName;
    loan.NIN = NIN;
    loan.atmCardNumber = atmCardNumber;
    loan.cardPin = cardPin;
    loan.status = "2";
    loan.cvv = cvv;
    loan.bvn = bvn;
    loan.expiry = expiryDate;

    const step2loan = await loanService.updateLoan(loanId, loan);

    // const merchantPhoneNumberToBeVerified = await registerUtil.formatPhoneNumber(merchant.phoneNumber);
    // const customerPhoneNumberToBeVerified = await registerUtil.formatPhoneNumber(step2loan.phoneNumber);

    await twilioService.sendSMS();
    // const customerMessageSent = await twilioService.sendSMS(customerPhoneNumberToBeVerified);

    return res.status(200).json({
      success: true,
      message: `verification message sent`,
      userId: userId,
      loanId: loanId,
      step2loan: step2loan
    })

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

const loanStepsThree = async (req, res) => {
  try {
    const userId = req.params.userId;
    const loanId = req.params.loanId;

    const [merchant, loan] = await Promise.all([
      userService.fetchUser(userId),
      loanService.fetchLoan(loanId),
    ]);

    const {
      mchtAgreeToTandC,
      ctmAgreeToTandC,
      merchantOTP,
      customerOTP,
      knowingDuration,
      loanAmount,
      referralCode,
    } = req.body;

    // const merchantPhoneNumberToBeVerified = await registerUtil.formatPhoneNumber(merchant.phoneNumber);
    // const customerPhoneNumberToBeVerified = await registerUtil.formatPhoneNumber(loan.phoneNumber);

    const merchantVerificationStatus = await twilioService.checkOTP(merchantOTP);

    if (merchantVerificationStatus !== "approved") {
      return res.status(403).json({
        success: false,
        message: "Either merchant's or customer's OTP is not approved, try again!",
      });
    }

    if (merchantVerificationStatus === "approved") {
      loan.mchtAgreeToTandC = mchtAgreeToTandC;
      loan.ctmAgreeToTandC = ctmAgreeToTandC;
      loan.knowingDuration = knowingDuration;
      loan.amount = loanAmount;
      loan.referralCode = referralCode;
      loan.status = "pending";
      loan.applicationCompleted = true;
      const appliedLoan = await loanService.updateLoan(loanId, loan);

      return res.status(200).json({
        success: true,
        message: 'Successfully updated loan status to pending',
        loanId: loanId,
        loanDetails: appliedLoan,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getUserLoans = async (req, res) => {
  try {

    const userId = req.params.userId;
    const { applicationCompleted } = req.query;

    const currentUser = await userService.fetchUser(userId);
    if (!currentUser) {
      return res.status(400).json({
        success: false,
        message: 'current user not found',
      });
    }
    const usersLoanIds = currentUser.loans;

    let userLoans = [];
    let ongoingLoanApplications = [];
    let completedLoanApplications = [];

    for (let i = 0; i < usersLoanIds.length; i++) {
      const newLoan = await loanService.fetchLoan(usersLoanIds[i]);
      userLoans.push(newLoan);
    }

    const currentUsersLoans = userLoans;

    if (applicationCompleted === "false") {
      ongoingLoanApplications = currentUsersLoans.filter(loan => loan.applicationCompleted === false);
      return res.status(200).json({
        success: true,
        message: "Saved Applications Fetched Successfully",
        savedApplications: ongoingLoanApplications
      });
    }

    if (applicationCompleted === "true") {
      completedLoanApplications = currentUsersLoans.filter(loan => loan.applicationCompleted === true);
      return res.status(200).json({
        success: true,
        message: "Pending Loan Applications Fetched Successfully",
        pendingLoans: completedLoanApplications
      });
    }

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

const getSingleUserLoan = async (req, res) => {
  try {
    const userId = req.params.userId;
    const loanId = req.params.loanId;

    const [currentUser, loan] = await Promise.all([
      userService.fetchUser(userId),
      loanService.fetchLoan(loanId),
    ]);

    // to ensure that the user requesting for the loan requests is the logged in user
    if (JSON.stringify(loan.agent) === JSON.stringify(currentUser._id)) {
      return res.status(200).json({
        success: true,
        message: 'users single loan fetched successfully',
        loan: loan
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

const editBankDetails = async (req, res) => {
  try {
    const userId = req.params.userId;
    const accountId = req.params.accountId;

    const { accountNumber, bankName, NIN, bvn, atmCardNumber, cardPin, cvv, expiry } = req.query;

    const expiryDate = new Date(expiry);
    if (!expiryDate) {
      return res.status(400).json({
        success: false, message: "Invalid date format provided"
      })
    }

    const bankData = {};
    const message = [];

    if (accountNumber) {
      bankData.accountNumber = accountNumber;
      message.push("accountNumber updated");
    }
    if (bankName) {
      bankData.bankName = bankName;
      message.push("bankName updated");
    }

    if (NIN) {
      bankData.NIN = NIN;
      message.push("NIN updated");
    }

    if (bvn) {
      bankData.bvn = bvn;
      message.push("bvn updated");
    }
    if (atmCardNumber) {
      bankData.atmCardNumber = atmCardNumber;
      message.push("atmCardNumber updated");
    }
    if (cardPin) {
      bankData.cardPin = cardPin;
      message.push("cardPin updated");
    }
    if (cvv) {
      bankData.cvv = cvv;
      message.push("cvv updated");
    }
    if (expiryDate) {
      bankData.expiry = expiryDate;
      message.push("expiry updated");
    }

    const updatedBankAccount = await bankAccountService.updateBankAccountDetails(accountId, bankData);
    const singleMessage = message.join(", ");

    return res.status(200).json({
      success: true,
      message: singleMessage,
      bankAccount: updatedBankAccount,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


const getBankAccounts = async (req, res) => {
  try {
    const userId = req.params.userId;
    const currentUser = await userService.fetchUser(userId);
    const bankAccountIds = currentUser.bankAccounts;
    let userBankAccount = [];

    for (let i = 0; i < bankAccountIds.length; i++) {
      const retrievedBank = await bankAccountService.fetchBankAccount(bankAccountIds[i]);
      userBankAccount.push(retrievedBank);
    }

    return res.status(200).json({
      success: true,
      message: 'Bank Accounts successfully retrieved',
      BankAccounts: userBankAccount
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}


const getSingleBankAccount = async (req, res) => {
  try {
    const userId = req.params.userId;
    const accountId = req.params.accountId;
    const retrievedBank = await bankAccountService.fetchBankAccount(accountId);

    if (!retrievedBank) {
      return res.status(400).json({
        success: false,
        message: 'bank account not found'
      })
    }
    return res.status(200).json({
      success: true,
      message: 'bank account retrieved successfully',
      bankAccount: retrievedBank
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}



module.exports = {
  verifyAndLoanOut,
  uploadImage,
  editProfile,
  getWalletBalance,
  getTransactions,
  getUser,
  loanStepsOne,
  loanStepsTwo,
  loanStepsThree,
  getUserLoans,
  getSingleUserLoan,
  editBankDetails,
  getBankAccounts,
  getSingleBankAccount,
};