import Gallery from "../models/Gallery.js";

export const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    const fileUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;

    const newImage = await Gallery.create({
      image: fileUrl,
    });

    res.json({ success: true, message: "Image uploaded", data: newImage });

  } catch (error) {
    res.status(500).json({ success: false, message: "Upload failed", error });
  }
};

export const getAllImages = async (req, res) => {
  try {
    const images = await Gallery.find().sort({ createdAt: -1 });
    res.json({ success: true, data: images });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch images" });
  }
};

export const deleteImage = async (req, res) => {
  try {
    const id = req.params.id;

    const image = await Gallery.findByIdAndDelete(id);

    if (!image) {
      return res.status(404).json({ success: false, message: "Image not found" });
    }

    res.json({ success: true, message: "Image deleted" });

  } catch (error) {
    res.status(500).json({ success: false, message: "Delete failed" });
  }
};
