import mongoose from "mongoose";

const contactInquirySchema = new mongoose.Schema(
  {
    fullName: String,
    email: String,
    message: String,

    status: {
      type: String,
      enum: ["New", "Pending", "Viewed", "Replied"],
      default: "New",
    },

    replyMessage: { type: String },
    repliedAt: { type: Date },
  },
  { timestamps: true }
);

export default mongoose.model("ContactInquiry", contactInquirySchema);
