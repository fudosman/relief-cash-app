const { jwtService, userService, walletService, twilioService, hashService, bankAccountService } = require("../services");
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
    const phoneNumberToBeVerified = await registerUtil.formatPhoneNumber(newUser.phoneNumber);
    console.log(phoneNumberToBeVerified);

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
    const messageSent = await twilioService.sendSMS(phoneNumberToBeVerified)

    return res.status(201).json({
      success: true,
      message: "User registration successful, check your sms for verification token",
      user: newUser,
      usersBankAccount: usersBankAccount,
      messageSent: messageSent
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
      username: payload.username,
      password: payload.password
    }
    const authenticatedUser = userService.authenticateUser(userData);
    const token = jwtService.signToken(authenticatedUser);
    if (!token) {
      return res.status(305).json({
        success: false,
        error: `jwt error, token not found`
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
    const { mchtAgreeToTandC, ctmAgreeToTandC, merchantOTP, customerOTP, knowningDuration, loanAmount, referralCode } = req.body;

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