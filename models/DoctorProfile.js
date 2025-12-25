import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const doctorProfileSchema = new mongoose.Schema(
  {
    prefix: { type: String, default: "Dr." },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    role: { type: String, default: "Skin Specialist" },
    phone: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    profileImage: { type: String },

    otp: { type: String },
    otpExpiry: { type: Date },
  },
  { timestamps: true }
);

// hash password
doctorProfileSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

export default mongoose.model("DoctorProfile", doctorProfileSchema);
