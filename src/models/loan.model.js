const mongoose = require('mongoose');

const loanSchema = new mongoose.Schema({
  amount: Number,
  interestRate: Number,
  // Add fields for loan details
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  agent: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  // Add other loan-related fields
});

const Loan = mongoose.model('Loan', loanSchema);

module.exports = Loan;
