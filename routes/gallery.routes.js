import express from "express";
import upload from "../middleware/upload.js";
import {
  uploadImage,
  getAllImages,
  deleteImage
} from "../controllers/gallery.controller.js";

const router = express.Router();

// GET all images
router.get("/", getAllImages);

// Upload (field name must be "image")
router.post("/", upload.single("image"), uploadImage);

// Delete
router.delete("/:id", deleteImage);

export default router;
