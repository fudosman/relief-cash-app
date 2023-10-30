const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  // Other user-related fields
  wallets: [{ type: Schema.Types.ObjectId, ref: 'Wallet' }],
  bankAccounts: [{ type: Schema.Types.ObjectId, ref: 'BankAccount' }],
  referralCodes: [{ type: Schema.Types.ObjectId, ref: 'ReferralCode' }],
  loans: [{ type: Schema.Types.ObjectId, ref: 'Loan' }],
  supportCards: [{ type: Schema.Types.ObjectId, ref: 'SupportCard' }],
  transactions: [{ type: Schema.Types.ObjectId, ref: 'Transaction' }],
  creditRating: { type: Schema.Types.ObjectId, ref: 'CreditRating' },
}, {
  timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;