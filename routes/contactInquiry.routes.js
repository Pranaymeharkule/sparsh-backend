import express from "express";
import {
  getAllInquiries,
  getInquiryCounts,
  markInquiryAsRead,
  replyToInquiry,
  // seedInquiries  // (only if you still use it)
} from "../controllers/contactInquiry.controller.js";

const router = express.Router();

router.get("/", getAllInquiries);
router.get("/count", getInquiryCounts);

// ✅ new routes
router.patch("/:id/read", markInquiryAsRead);
router.post("/:id/reply", replyToInquiry);

// router.get("/seed", seedInquiries);

export default router;
