import express from "express";
import { getAllPayments } from "../controllers/payment.controller.js";

const router = express.Router();

// GET /api/admin/payments
router.get("/", getAllPayments);

export default router;
