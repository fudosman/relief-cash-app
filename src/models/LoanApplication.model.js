const mongoose = require("mongoose");
const { Schema } = mongoose;

const loanApplicationSchema = new Schema(
  {

  },
  {
    timestamps: true,
  }
);
const LoanApplication = mongoose.model("LoanApplication", loanApplicationSchema);

module.exports = LoanApplication;

