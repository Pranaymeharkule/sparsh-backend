import ContactInquiry from "../models/ContactInquiry.js";

// GET ALL
export const getAllInquiries = async (req, res) => {
  const inquiries = await ContactInquiry.find().sort({ createdAt: -1 });
  res.json({ success: true, inquiries });
};

// GET COUNTS
export const getInquiryCounts = async (req, res) => {
  const counts = {
    Pending: await ContactInquiry.countDocuments({ status: "Pending" }),
    New: await ContactInquiry.countDocuments({ status: "New" }),
    Replied: await ContactInquiry.countDocuments({ status: "Replied" }),
  };
  res.json({ success: true, counts });
};

// ✅ MARK AS READ / VIEWED
export const markInquiryAsRead = async (req, res) => {
  try {
    const { id } = req.params;

    const inquiry = await ContactInquiry.findByIdAndUpdate(
      id,
      { status: "Viewed" },
      { new: true }
    );

    if (!inquiry) {
      return res.status(404).json({ success: false, message: "Inquiry not found" });
    }

    res.json({ success: true, message: "Inquiry marked as read", inquiry });
  } catch (err) {
    console.error("markInquiryAsRead error:", err);
    res.status(500).json({ success: false, message: "Failed to mark as read" });
  }
};

// ✅ REPLY TO INQUIRY
export const replyToInquiry = async (req, res) => {
  try {
    const { id } = req.params;
    const { replyMessage } = req.body;

    const inquiry = await ContactInquiry.findByIdAndUpdate(
      id,
      {
        status: "Replied",
        replyMessage,
        repliedAt: new Date(),
      },
      { new: true }
    );

    if (!inquiry) {
      return res.status(404).json({ success: false, message: "Inquiry not found" });
    }

    // TODO (optional): send email using nodemailer here

    res.json({ success: true, message: "Reply sent successfully", inquiry });
  } catch (err) {
    console.error("replyToInquiry error:", err);
    res.status(500).json({ success: false, message: "Failed to send reply" });
  }
};

export const seedInquiries = async (req, res) => {
  const sample = [
    {
      fullName: "Rohit Sharma",
      email: "rohit@gmail.com",
      message: "Do you offer pigmentation treatment?",
      status: "New"
    },
    {
      fullName: "Megha Patil",
      email: "megha@gmail.com",
      message: "What is the cost of Hydra Facial?",
      status: "Pending"
    },
    {
      fullName: "Siddharth Jain",
      email: "sid@gmail.com",
      message: "Can I book appointment online?",
      status: "Replied"
    }
  ];

  await ContactInquiry.insertMany(sample);

  res.json({ success: true, message: "Inquiry samples added!" });
};

