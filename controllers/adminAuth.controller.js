import Admin from "../models/Admin.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";
import sendOTP from "../utils/sendOTP.js";

/* ---------------------- REGISTER ADMIN ---------------------- */
export const registerAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const exist = await Admin.findOne({ email });
    if (exist)
      return res.status(400).json({ message: "Admin already exists" });

    const hashedPass = await bcrypt.hash(password, 10);

    const admin = await Admin.create({
      email,
      password: hashedPass,
    });

    res.status(201).json({
      message: "Admin registered successfully",
      token: generateToken(admin._id),
      admin,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

/* ---------------------- LOGIN ADMIN ---------------------- */
export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin)
      return res.status(404).json({ message: "Admin not found" });

    const match = await bcrypt.compare(password, admin.password);
    if (!match)
      return res.status(400).json({ message: "Invalid password" });

    res.json({
      success: true,
      message: "Login successful",
      token: generateToken(admin._id),
      admin,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

/* ---------------------- FORGOT PASSWORD → SEND OTP ---------------------- */
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin)
      return res.status(404).json({ message: "Admin not found" });

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000);

    // Save OTP
    admin.resetOtp = otp;
    admin.resetOtpExpires = Date.now() + 10 * 60 * 1000; // 10 min
    await admin.save();

    // Send email
    await sendOTP(email, otp);

    res.json({
      success: true,
      message: "OTP sent successfully!",
    });

  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

/* ---------------------- VERIFY OTP → GENERATE resetToken ---------------------- */
export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    if (!admin.resetOtp || !admin.resetOtpExpires)
      return res.status(400).json({ message: "OTP not generated" });

    if (admin.resetOtp !== Number(otp))
      return res.status(400).json({ message: "Invalid OTP" });

    if (admin.resetOtpExpires < Date.now())
      return res.status(400).json({ message: "OTP expired" });

    // IMPORTANT → return OTP as resetToken
    return res.json({
      success: true,
      message: "OTP verified successfully!",
      resetToken: admin.resetOtp,   // << ADD THIS
    });

  } catch (error) {
    return res.status(500).json({ message: "Server Error", error });
  }
};


/* ---------------------- RESET PASSWORD ---------------------- */
export const resetPassword = async (req, res) => {
  try {
    const { email, resetToken, newPassword, confirmPassword } = req.body;

    if (!email || !resetToken)
      return res.status(400).json({ success: false, message: "Invalid request" });

    if (newPassword !== confirmPassword)
      return res.status(400).json({ success: false, message: "Passwords do not match" });

    const admin = await Admin.findOne({ email });
    if (!admin)
      return res.status(404).json({ success: false, message: "Admin not found" });

    // 🔥 MAIN FIX
    if (admin.resetOtp !== Number(resetToken))
      return res.status(400).json({ success: false, message: "Invalid or expired token" });

    if (admin.resetOtpExpires < Date.now())
      return res.status(400).json({ success: false, message: "Reset token expired" });

    const hashed = await bcrypt.hash(newPassword, 10);

    admin.password = hashed;

    admin.resetOtp = null;
    admin.resetOtpExpires = null;

    await admin.save();

    res.json({
      success: true,
      message: "Password reset successful",
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
