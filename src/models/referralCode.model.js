const mongoose = require('mongoose');

const referralCodeSchema = new mongoose.Schema({
  code: String,
  referredBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  referredUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  // Add other referral code-related fields
});

const ReferralCode = mongoose.model('ReferralCode', referralCodeSchema);

module.exports = ReferralCode;
