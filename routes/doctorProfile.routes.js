import express from "express";
import {
  getDoctorProfile,
  sendProfileOtp,
  verifyProfileOtp,
  resetProfilePassword,
  updateDoctorProfile, // ✅ ADD THIS
} from "../controllers/doctorProfile.controller.js";

const router = express.Router();

router.get("/profile", getDoctorProfile);
router.post("/profile/send-otp", sendProfileOtp);
router.post("/profile/verify-otp", verifyProfileOtp);
router.post("/profile/reset-password", resetProfilePassword);
router.put("/profile", updateDoctorProfile); // ✅ ADD THIS

export default router;
