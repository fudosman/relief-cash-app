const mongoose = require("mongoose");
const { Schema } = mongoose;

const ReferalDataSchema = new Schema(
  {

  },
  {
    timestamps: true,
  }
);
const ReferalData = mongoose.model("ReferalData", ReferalDataSchema);

module.exports = ReferalData;

