import BlockedDate from "../models/BlockedDate.js";

/* ================= BLOCK DATE ================= */
export const blockDate = async (req, res) => {
  try {
    const { date, reason } = req.body;

    if (!date) {
      return res.status(400).json({
        success: false,
        message: "Date is required",
      });
    }

    const exists = await BlockedDate.findOne({ date });
    if (exists) {
      return res.status(400).json({
        success: false,
        message: "Date already blocked",
      });
    }

    const blocked = await BlockedDate.create({
      date,
      reason,
    });

    res.json({
      success: true,
      message: "Date blocked successfully",
      data: blocked,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to block date",
    });
  }
};


/* ================= GET BLOCKED DATES ================= */
export const getBlockedDates = async (req, res) => {
  try {
    const dates = await BlockedDate.find().sort({ date: 1 });

    res.json({
      success: true,
      data: dates,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch blocked dates",
    });
  }
};

/* ================= UNBLOCK DATE ================= */
export const unblockDate = async (req, res) => {
  try {
    const { date } = req.params;

    await BlockedDate.findOneAndDelete({ date });

    res.json({
      success: true,
      message: "Date unblocked successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to unblock date",
    });
  }
};
