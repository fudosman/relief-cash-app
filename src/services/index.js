const authService = require('./auth.service');
const bankAccountService = require('./bankAccount.service');
const customerSupportService = require('./customerSupport.service');
const jwtService = require('./jwt.service');
const loanService = require('./loan.service');
const notificationService = require("./notifications.service");
const referralCodeService = require('./referralCode.service');
const transactionService = require('./transaction.service');
const userService = require('./user.service');
const walletService = require('./wallet.service');
const hashService = require('./hash.service');
const twilioService = require('./twilio.service');
const cloudinaryService = require('./cloudinary.service');

module.exports = {
  authService,
  bankAccountService,
  customerSupportService,
  jwtService,
  loanService,
  notificationService,
  referralCodeService,
  transactionService,
  userService,
  walletService,
  hashService,
  twilioService,
  cloudinaryService
}