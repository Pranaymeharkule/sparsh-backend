import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["payment", "inquiry"],
      required: true,
    },
    name: String,
    email: String,
    contact: String,
    city: String,
    datetime: String,
    subject: String,
    status: String, // Approved / Pending etc
  },
  { timestamps: true }
);

export default mongoose.model("Notification", notificationSchema);
