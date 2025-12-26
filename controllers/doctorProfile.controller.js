import DoctorProfile from "../models/DoctorProfile.js";

// GET PROFILE
export const getDoctorProfile = async (req, res) => {
  try {
    const doctor = await DoctorProfile.findOne().select("-password -otp -otpExpiry");
    if (!doctor) {
      return res.status(404).json({ success: false, message: "Profile not found" });
    }
    res.json({ success: true, data: doctor });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// SEND OTP
export const sendProfileOtp = async (req, res) => {
  const { email } = req.body;

  const doctor = await DoctorProfile.findOne({ email });
  if (!doctor) {
    return res.status(404).json({ success: false, message: "Email not found" });
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  doctor.otp = otp;
  doctor.otpExpiry = Date.now() + 5 * 60 * 1000;
  await doctor.save();

  console.log("OTP:", otp); // for testing

  res.json({ success: true, message: "OTP sent successfully" });
};

// VERIFY OTP
export const verifyProfileOtp = async (req, res) => {
  const { email, otp } = req.body;

  const doctor = await DoctorProfile.findOne({ email });

  if (!doctor || doctor.otp !== otp || doctor.otpExpiry < Date.now()) {
    return res.status(400).json({ success: false, message: "Invalid OTP" });
  }

  res.json({ success: true, message: "OTP verified" });
};

// RESET PASSWORD
export const resetProfilePassword = async (req, res) => {
  const { email, newPassword } = req.body;

  const doctor = await DoctorProfile.findOne({ email });
  if (!doctor) return res.status(404).json({ success: false });

  doctor.password = newPassword; // bcrypt auto
  doctor.otp = null;
  doctor.otpExpiry = null;

  await doctor.save();

  res.json({ success: true, message: "Password updated successfully" });
};
