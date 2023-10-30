const mongoose = require('mongoose');

const bankAccountSchema = new mongoose.Schema({
  accountNumber: String,
  accountName: String,
  // Add other bank account-related fields
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

const BankAccount = mongoose.model('BankAccount', bankAccountSchema);

module.exports = BankAccount;
