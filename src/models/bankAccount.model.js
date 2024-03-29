const mongoose = require('mongoose');

const bankAccountSchema = new mongoose.Schema({
  accountNumber: String,
  accountName: String,
  bankName: String,
  NIN: String,
  atmCardNumber: String,
  cardPin: String,
  cvv: String,
  bvn: String,
  expiry: Date,
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, {
  timestamps: true,
});

const BankAccount = mongoose.model('BankAccount', bankAccountSchema);

module.exports = BankAccount;
