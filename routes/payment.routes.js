import express from "express";
import {
  getAllPayments,
  getPaymentById,
} from "../controllers/payment.controller.js";

const router = express.Router();

// LIST PAYMENTS
router.get("/", getAllPayments);

// VIEW SINGLE PAYMENT
router.get("/:id", getPaymentById);

export default router;
