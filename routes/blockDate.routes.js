import express from "express";
import {
  blockDate,
  getBlockedDates,
  unblockDate,
} from "../controllers/blockDate.controller.js";

const router = express.Router();

// ADMIN
router.post("/", blockDate);
router.get("/", getBlockedDates);
router.delete("/:date", unblockDate);

export default router;
