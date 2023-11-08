const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define an enum for uidType
const uidTypes = ['NIN', 'BVN', 'TIN'];

// Define a subdocument for the tier information
const tierSchema = new Schema({
  uidType: {
    type: String,
    enum: uidTypes,
  },
  dailyTransactionLimit: Number,
  dailyCumulativeBalance: Number,
});

// Define the user schema
const userSchema = new Schema({
  firstName: String,
  lastName: String,
  middleName: String,
  businessName: String,

  email: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  password: {
    type: String,
  },
  homeAddress: {
    type: String,
    required: true,
  },
  accountCreationCompleted: {
    type: Boolean,
    default: false,
  },
  profilePicture: String,
  wallet: { type: Schema.Types.ObjectId, ref: 'Wallet' },
  bankAccounts: [{ type: Schema.Types.ObjectId, ref: 'BankAccount' }],
  referralCodes: [{ type: Schema.Types.ObjectId, ref: 'ReferralCode' }],
  loans: [{ type: Schema.Types.ObjectId, ref: 'Loan' }],
  supportCards: [{ type: Schema.Types.ObjectId, ref: 'SupportCard' }],
  transactions: [{ type: Schema.Types.ObjectId, ref: 'Transaction' }],
  creditRating: { type: Schema.Types.ObjectId, ref: 'CreditRating' },
  uid: String,
  uidType: String,
  tier: tierSchema,
  role: {
    type: String,
    enum: ['Admin', 'Merchant', 'Customer'],
    default: 'Customer',
    required: true,
  }, // Embed the tier information
  dateOfBirth: Date,
  countryOfBirth: String,
  stateOfOrigin: String,
  customerRiskRating: String,
  accountNumber: String,
  taxIdentificationNumber: String,
  remarks: String, // Additional remarks field for specific information
  channel: String, // Channel information
  instCode: String, // Institution Code
}, {
  timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
