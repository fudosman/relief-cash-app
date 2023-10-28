const mongoose = require("mongoose");
const { Schema } = mongoose;

const NotificationSchema = new Schema(
  {

  },
  {
    timestamps: true,
  }
);
const Notification = mongoose.model("Notification", NotificationSchema);

module.exports = Notification;

