const { authService, jwtService, userService, walletService, hashService, bankAccountService } = require("../services");

const register = async function (req, res) {
  try {
    const payload = req.body;

    const walletData = {

    };
    const bankAccountData = {

    };

    const bankAccount = await bankAccountService.createBankAccount(bankAccountData);
    const wallet = await walletService.createWallet(walletData);
    const hashedPassword = await hashService.hashPassword(payload.password);

    const userData = {
      title: payload.title,
      firstName: payload.firstName,
      lastName: payload.lastName,
      middleName: payload.middleName,
      businessName: payload.businessName,
      email: payload.email,
      phoneNumber: payload.phoneNumber,
      password: hashedPassword,
      homeAddress: payload.homeAddress,
      wallets: wallet.id,
      bankAccounts: bankAccount.id,
      referralCodes: payload.referralCodes,
      uid: payload.uid,
      uidType: payload.uidType,
      tier: payload.tier,
      dailyTransactionLimit: payload.dailyTransactionLimit,
      dateOfBirth: payload.dateOfBirth,
      countryOfBirth: payload.countryOfBirth,
      stateOfOrigin: payload.stateOfOrigin,
      customerRiskRating: 0,
      accountNumber: bankAccount.accountNumber,
      taxIdentificationNumber: payload.taxIdentificationNumber,
      channel: payload.channel,
      instCode: payload.instCode
    };

    const user = await userService.registerUser(userData);
    if (!user) {
      return res.status(400).json({
        success: false,
        error: "User registration failed"
      });
    }

    return res.status(201).json({
      success: true,
      message: "User registration successful",
      user: user
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



module.exports = {
  register,
  login
};