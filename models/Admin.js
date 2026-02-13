import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    resetOtp: { type: Number },
    resetOtpExpires: { type: Number },
  },
  { timestamps: true }
);

// 🔥 ADD THIS
adminSchema.index({ email: 1 });

const Admin = mongoose.model("Admin", adminSchema);

export default Admin;
