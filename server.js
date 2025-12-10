import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

import adminAuthRoutes from "./routes/adminAuth.routes.js";
import appointmentRoutes from "./routes/appointment.routes.js";
import serviceRoutes from "./routes/service.routes.js";
import contactInquiryRoutes from "./routes/contactInquiry.routes.js";
import galleryRoutes from "./routes/gallery.routes.js";

dotenv.config();

const app = express();

// MIDDLEWARES
app.use(cors({ origin: "*" }));
app.use(express.json());

// ✅ Static folder (must come before routes)
app.use("/uploads", express.static("uploads"));

// ROUTES
app.use("/api/admin", adminAuthRoutes);
app.use("/api/admin/appointments", appointmentRoutes);
app.use("/api/admin/services", serviceRoutes);
app.use("/api/admin/contactInquiry", contactInquiryRoutes);
app.use("/api/admin/gallery", galleryRoutes);

// CONNECT DATABASE
connectDB();

// SERVER LISTEN
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
