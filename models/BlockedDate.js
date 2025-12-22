import mongoose from "mongoose";

const blockedDateSchema = new mongoose.Schema(
  {
    date: {
      type: String, // "2025-06-21"
      required: true,
      unique: true,
    },
    reason: {
      type: String,
      default: "Not Available",
    },
    blockedBy: {
      type: String,
      default: "Admin",
    },
  },
  { timestamps: true }
);

export default mongoose.model("BlockedDate", blockedDateSchema);
