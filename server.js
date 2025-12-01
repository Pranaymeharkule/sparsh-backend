import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import adminAuthRoutes from "./routes/adminAuth.routes.js";
import appointmentRoutes from "./routes/appointment.routes.js";
import serviceRoutes from "./routes/service.routes.js";
import contactInquiryRoutes from "./routes/contactInquiry.routes.js";





dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// ✅ AUTH ROUTES (NO /auth HERE)
app.use("/api/admin", adminAuthRoutes);

// ✅ APPOINTMENT ROUTES (same as before)
app.use("/api/admin/appointments", appointmentRoutes);

connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running on port", PORT));

app.use("/api/admin/services", serviceRoutes);
app.use("/api/admin/contactInquiry", contactInquiryRoutes);


