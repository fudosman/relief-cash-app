const mongoose = require('mongoose');

const bankAccountSchema = new mongoose.Schema({
  accountNumber: String,
  accountName: String,
  bankName: String,
  NIN: Number,
  atmCardNumber: Number,
  cardPin: Number,
  cvv: Number,
  expiry: Date,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

const BankAccount = mongoose.model('BankAccount', bankAccountSchema);

module.exports = BankAccount;
