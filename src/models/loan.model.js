const mongoose = require('mongoose');

const loanSchema = new mongoose.Schema({

  firstname: String,
  middlename: String,
  lastname: String,
  email: String,
  phoneNumber: String,
  homeAddress: String,

  knowingDuration: String,
  amount: Number,
  accountNumber: String,
  bankName: String,
  NIN: String,
  bvn: String,
  atmCardNumber: String,
  cardPin: String,
  cvv: String,
  expiry: Date,

  mchtAgreeToTandC: Boolean,
  ctmAgreeToTandC: Boolean,
  interestRate: Number,
  status: {
    type: String,
    enum: ["1", "2", "pending", "approved", "rejected", "repaid"],
    default: "pending"
  },
  rejectReason: String,
  referralCode: String,
  agent: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

const Loan = mongoose.model('Loan', loanSchema);

module.exports = Loan;
