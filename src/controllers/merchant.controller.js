const { userService, hashService, jwtService, bankAccountService, walletService } = require("../services");

const register = async (req, res) => {
  try {
    const payload = {
      firstName, lastName, email, phoneNumber, homeAddress, role
    } = req.body;

    const hashedPassword = await hashService.hashPassword(payload.password);

    const userData = {
      firstName: firstName,
      lastName: lastName,
      role: "Merchant",
      email: payload.email,
      phoneNumber: payload.phoneNumber,
      password: hashedPassword,
      homeAddress: payload.homeAddress
    };

    const newUser = await userService.registerUser(userData);


    return res.status(201).json({
      success: true,
      message: "Merchant registration successful",
      user: newUser
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

const login = async (req, res) => {
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
}

const bankAccount = async (req, res) => {
  try {
    const userId = req.user.id;
    const { accountNumber, bankName, NIN, BVN, ATMcardNumber, cardPin, cvv, expiryDate
    } = req.body;
    const bankData = {
      accountNumber: accountNumber,
      accountName: `${req.user.firstName} ${req.user.lastName}`,
      bankName: bankName,
      NIN: NIN,
      bvn: BVN,
      atmCardNumber: ATMcardNumber,
      cardPin: cardPin,
      cvv: cvv,
      expiry: expiryDate,
      owner: userId
    };

    const walletData = {
      balance: 0.00,
      user: userId
    };
    const newWallet = await walletService.createWallet(walletData)
    const newBankAccount = await bankAccountService.createBankAccount(bankData);

    let userData = req.user;
    userData.bankAccounts = userData.bankAccounts.push(newBankAccount);
    userData.wallet = newWallet.id;
    userData.accountCreationCompleted = true;

    const updatedUser = await userService.updateUser(userId, userData);
    if (!updatedUser) {
      return res.status(400).json({
        success: false,
        message: 'User update failed'
      })
    }
    return res.status(200).json({
      success: true,
      message: 'User update successful',
      user: updatedUser
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

const addNewAccount = async (req, res) => {
  try {
    const userId = req.user.id;
    const { accountNumber, bankName, NIN, BVN, ATMcardNumber, cardPin, cvv, expiryDate
    } = req.body;
    const bankData = {
      accountNumber: accountNumber,
      accountName: `${req.user.firstName} ${req.user.lastName}`,
      bankName: bankName,
      NIN: NIN,
      bvn: BVN,
      atmCardNumber: ATMcardNumber,
      cardPin: cardPin,
      cvv: cvv,
      expiry: expiryDate,
      owner: userId
    };

    const newBankAccount = await bankAccountService.createBankAccount(bankData);

    let userData = req.user;
    userData.bankAccounts = userData.bankAccounts.push(newBankAccount);

    const updatedUser = await userService.updateUser(userId, userData);
    if (!updatedUser) {
      return res.status(400).json({
        success: false,
        message: 'Adding new bank account failed'
      })
    }
    return res.status(200).json({
      success: true,
      message: 'new bank account added successfully',
      user: updatedUser
    });
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
  bankAccount,
  addNewAccount
}