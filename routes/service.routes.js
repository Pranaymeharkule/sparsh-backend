import express from "express";
import {
  getAllServices,
  addService,
  deleteService,
  updateService,
    seedServices

} from "../controllers/service.controller.js";

const router = express.Router();

router.get("/", getAllServices);
router.post("/", addService);
router.put("/:id", updateService);
router.delete("/:id", deleteService);
router.get("/seed", seedServices);

export default router;
