const mongoose = require('mongoose');

const bankAccountSchema = new mongoose.Schema({
  accountNumber: String,
  accountName: String,
  bankName: String,
  NIN: String,
  atmCardNumber: String,
  cardPin: String,
  cvv: String,
  expiry: Date,
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

const BankAccount = mongoose.model('BankAccount', bankAccountSchema);

module.exports = BankAccount;
