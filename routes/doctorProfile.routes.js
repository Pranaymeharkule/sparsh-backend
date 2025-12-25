import express from "express";
import {
  getDoctorProfile,
  sendProfileOtp,
  resetProfilePassword,
} from "../controllers/doctorProfile.controller.js";

const router = express.Router();

router.get("/profile", getDoctorProfile);
router.post("/profile/send-otp", sendProfileOtp);
router.post("/profile/reset-password", resetProfilePassword);

export default router;
