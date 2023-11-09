const mongoose = require('mongoose');

const customerSupportCardSchema = new mongoose.Schema({
  cardNumber: String,
  // Add other customer support card-related fields
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, {
  timestamps: true,
});

const CustomerSupportCard = mongoose.model('CustomerSupportCard', customerSupportCardSchema);

module.exports = CustomerSupportCard;
