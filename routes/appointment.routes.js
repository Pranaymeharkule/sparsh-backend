import express from "express";
import {
  getDashboardStats,
  getRecentAppointments,
  getAllAppointments,
  getAppointmentById,
  deleteAppointment,
  updateAppointment
} from "../controllers/appointment.controller.js";

const router = express.Router();

router.get("/dashboard/stats", getDashboardStats);
router.get("/dashboard/recent", getRecentAppointments);

router.get("/getAllAppointments", getAllAppointments);

router.get("/getAppointmentById/:id", getAppointmentById);

router.put("/deleteAppointment/:id", deleteAppointment);

router.put("/updateAppointment/:id", updateAppointment);

export default router;
