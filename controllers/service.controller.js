import Service from "../models/Service.js";

// GET ALL
export const getAllServices = async (req, res) => {
  const services = await Service.find().sort({ createdAt: -1 });
  res.json({ success: true, services });
};

// CREATE
export const addService = async (req, res) => {
  const { name, category, status } = req.body;

  await Service.create({ name, category, status });
  res.json({ success: true, message: "Service created successfully" });
};

// UPDATE
export const updateService = async (req, res) => {
  const { id } = req.params;
  const { name, category, status } = req.body;

  await Service.findByIdAndUpdate(id, { name, category, status });
  res.json({ success: true, message: "Service updated successfully" });
};

// DELETE
export const deleteService = async (req, res) => {
  const { id } = req.params;
  await Service.findByIdAndDelete(id);
  res.json({ success: true, message: "Service deleted successfully" });
};


// ADD TEST DATA
export const seedServices = async (req, res) => {
  const sample = [
    { name: "Hair Cutting", category: "Hair", status: "Active" },
    { name: "Facial", category: "Skin Treatment", status: "Active" },
    { name: "Nail Art", category: "Beauty", status: "Inactive" },
  ];

  await Service.insertMany(sample);

  res.json({ success: true, message: "Services added!" });
};
