const { jwtService, userService, walletService, loanService, twilioService, hashService, bankAccountService } = require("../services");
const { registerUtil } = require("../utils");

const register = async function (req, res) {
  try {
    const payload = {
      fullName,
      email, phoneNumber, homeAddress, role, accountNumber, bankName, NIN, BVN, ATMcardNumber, cardPin, cvv, expiryDate, merchantOTP, customerOTP
    } = req.body;

    const Names = await registerUtil.splitFullName(payload.fullName);
    const hashedPassword = await hashService.hashPassword(payload.password);

    const userData = {
      firstName: Names.firstName,
      lastName: Names.surname,
      role: payload.role,
      middleName: Names.middleName ? Names.middleName : "",
      email: payload.email,
      phoneNumber: payload.phoneNumber,
      password: hashedPassword,
      homeAddress: payload.homeAddress
    };

    const newUser = await userService.registerUser(userData);
    const newUserId = newUser.id;
    const customerPhoneNumberToBeVerified = await registerUtil.formatPhoneNumber(newUser.phoneNumber);
    const merchantPhoneNumberToBeVerified = await registerUtil.formatPhoneNumber(req.user.phoneNumber);

    const newBankAccount = {
      accountNumber: payload.accountNumber,
      accountName: payload.fullName,
      bankName: payload.bankName,
      NIN: payload.NIN,
      BVN: payload.BVN,
      atmCardNumber: payload.ATMcardNumber,
      cardPin: payload.cardPin,
      cvv: payload.cvv,
      expiry: payload.expiryDate,
      owner: newUserId
    }

    const usersBankAccount = await bankAccountService.createBankAccount(newBankAccount);

    if (!newUser) {
      return res.status(400).json({
        success: false,
        message: "user registration failed"
      })
    }

    const merchantMessageSent = await twilioService.sendSMS(merchantPhoneNumberToBeVerified);
    const customerMessageSent = await twilioService.sendSMS(customerPhoneNumberToBeVerified);

    return res.status(201).json({
      success: true,
      message: "User registration successful, check your sms for verification token",
      merchantMessageSent: merchantMessageSent,
      customerMessageSent: customerMessageSent,
      merchantId: req.user ? req.user.id : "",
      customerId: req.user ? newUser.id : "",
      usersBankAccount: usersBankAccount,
    });


  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
};

// userLogin
const login = async function (req, res) {
  try {
    const payload = req.body;
    const userData = {
      email: payload.email,
      password: payload.password
    };

    const user = await userService.fetchUserByEmail(userData.email);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'User not found',
      })
    }
    const isValid = await hashService.verifyPassword(user.password, userData.password);
    let token;

    if (isValid) {
      token = await jwtService.signToken({ user });
    }

    if (!token) {
      return res.status(305).json({
        success: false,
        error: `Error creating token`
      })
    }
    return res.status(200).json({
      success: true,
      message: "user signed in successfully",
      token: token
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
};

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


module.exports = {
  register,
  login,
  verifyAndLoanOut,
}