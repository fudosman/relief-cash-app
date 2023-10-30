const bankAccount = require("./bankAccount.model");
const creditRating = require("./creditRating.model");
const customerSupportCard = require("./customerSupport.model");
const loan = require("./loan.model");
const notification = require("./notifications.model");
const referralCode = require("./referralCode.model");
const transaction = require("./transaction.model");
const User = require('./user.model');
const wallet = require('./wallet.model');


module.exports = {
    bankAccount,
    creditRating,
    customerSupportCard,
    loan,
    notification,
    referralCode,
    transaction,
    User,
    wallet,
};