import express from "express";
import {
  registerAdmin,
  loginAdmin,
  forgotPassword,
  verifyOtp,
  resetPassword,
} from "../controllers/adminAuth.controller.js";

const router = express.Router();

// Final URLs:
// POST /api/admin/register
// POST /api/admin/login
// POST /api/admin/forgot-password
// POST /api/admin/verify-otp
// POST /api/admin/reset-password

router.post("/register", registerAdmin);
router.post("/login", loginAdmin);
router.post("/forgot-password", forgotPassword);
router.post("/verify-otp", verifyOtp);
router.post("/reset-password", resetPassword);

export default router;
