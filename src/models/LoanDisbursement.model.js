const mongoose = require("mongoose");
const { Schema } = mongoose;

const loanDisbursmentSchema = new Schema(
  {

  },
  {
    timestamps: true,
  }
);
const LoanDisbursment = mongoose.model("LoanDisbursment", loanDisbursmentSchema);

module.exports = LoanDisbursment;

