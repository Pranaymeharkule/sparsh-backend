import DoctorProfile from "../models/DoctorProfile.js";

/* ================= GET PROFILE ================= */
export const getDoctorProfile = async (req, res) => {
  try {
    const profile = await DoctorProfile.findOne().select("-password -otp -otpExpiry");

    res.json({
      success: true,
      data: profile,
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Failed to fetch profile",
    });
  }
};

/* ================= SEND OTP ================= */
export const sendProfileOtp = async (req, res) => {
  const { email } = req.body;

  try {
    const doctor = await DoctorProfile.findOne({ email });
    if (!doctor) {
      return res.status(404).json({ success: false, message: "Email not found" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000);
    doctor.otp = otp;
    doctor.otpExpiry = Date.now() + 5 * 60 * 1000;
    await doctor.save();

    console.log("OTP:", otp); // replace with email later

    res.json({
      success: true,
      message: "OTP sent successfully",
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Failed to send OTP",
    });
  }
};

/* ================= VERIFY OTP & RESET PASSWORD ================= */
export const resetProfilePassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;

  try {
    const doctor = await DoctorProfile.findOne({ email });

    if (
      !doctor ||
      doctor.otp !== otp ||
      doctor.otpExpiry < Date.now()
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired OTP",
      });
    }

    doctor.password = newPassword;
    doctor.otp = null;
    doctor.otpExpiry = null;
    await doctor.save();

    res.json({
      success: true,
      message: "Password updated successfully",
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Password reset failed",
    });
  }
};
