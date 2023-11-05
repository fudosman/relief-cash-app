const mongoose = require('mongoose');

const loanSchema = new mongoose.Schema({
  mchtAgreeToTandC: Boolean,
  ctmAgreeToTandC: Boolean,
  amount: Number,
  interestRate: Number,
  knowingDuration: String,
  referralCode: String,
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  agent: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

const Loan = mongoose.model('Loan', loanSchema);

module.exports = Loan;
