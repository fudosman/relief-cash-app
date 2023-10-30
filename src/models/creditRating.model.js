const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const creditRatingSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
  assessmentDate: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true,
});

const CreditRating = mongoose.model('CreditRating', creditRatingSchema);
module.exports = CreditRating;
