const mongoose = require("mongoose");
const { Schema } = mongoose;

const loanRepaymentSchema = new Schema(
  {

  },
  {
    timestamps: true,
  }
);
const LoanRepayment = mongoose.model("LoanRepayment", loanRepaymentSchema);

module.exports = LoanRepayment;

