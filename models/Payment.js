import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    patientName: { type: String, required: true },
    contact: { type: String, required: true },
    city: { type: String, required: true },

    dateTime: { type: String, required: true },

    paymentSource: {
      type: String,
      enum: ["UPI", "Card", "Cash", "NetBanking"],
      default: "UPI",
    },

    transactionId: { type: String },
    fees: { type: Number, required: true },

    appointmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appointment",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Payment", paymentSchema);
