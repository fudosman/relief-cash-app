const mongoose = require("mongoose");
const { Schema } = mongoose;


const NotificationSchema = new Schema(
  {
    message: String,
    // Add other notification-related fields
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  {
    timestamps: true,
  }
);
const Notification = mongoose.model("Notification", NotificationSchema);

module.exports = Notification;

