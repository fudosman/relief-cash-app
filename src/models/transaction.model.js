const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  amount: Number,
  type: String, // Incoming or Outgoing
  // Add other transaction-related fields
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
