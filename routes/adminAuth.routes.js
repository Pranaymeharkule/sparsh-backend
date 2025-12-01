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
router.get("/createfirstadmin", async (req, res) => {
  try {
    const bcrypt = (await import("bcryptjs")).default;
    const Admin = (await import("../models/admin.model.js")).default;

    const hashedPassword = await bcrypt.hash("admin123", 10);
    await Admin.create({
      email: "admin@sparsh.com",
      password: hashedPassword,
    });

    res.json({ message: "Admin created successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


export default router;
