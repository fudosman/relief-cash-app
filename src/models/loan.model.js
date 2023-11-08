const mongoose = require('mongoose');

const loanSchema = new mongoose.Schema({

  firstName: String,
  middleName: String,
  lastName: String,
  email: String,
  phoneNumber: String,
  homeAddress: String,
  interestRate: Number,
  applicationCompleted: {
    type: Boolean,
    default: false
  },
  agent: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  status: {
    type: String,
    enum: ["1", "2", "pending", "approved", "rejected", "repaid"],
    default: "pending"
  },

  accountNumber: String,
  bankName: String,
  NIN: String,
  bvn: String,
  atmCardNumber: String,
  cardPin: String,
  cvv: String,
  expiry: Date,

  amount: Number,
  knowingDuration: String,
  mchtAgreeToTandC: Boolean,
  ctmAgreeToTandC: Boolean,
  rejectReason: String,
  referralCode: String,
});

const Loan = mongoose.model('Loan', loanSchema);

module.exports = Loan;
