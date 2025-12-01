import Appointment from "../models/Appointment.js";

// Dashboard stats (match frontend keys)
export const getDashboardStats = async (req, res) => {
  try {
    const totalAppointments = await Appointment.countDocuments();

    const groupAppointments = await Appointment.countDocuments({
      numberOfPatients: { $gt: 1 }
    });

    const nagpurAppointments = await Appointment.countDocuments({
      city: "Nagpur",
      status: "Upcoming"
    });

    const umredAppointments = await Appointment.countDocuments({
      city: "Umred",
      status: "Upcoming"
    });

    // If you want percentage change calculate here; returning 0 for now
    const percentageChange = 0;

    res.json({
      success: true,
      data: {
        totalAppointments,
        groupAppointments,
        nagpurUpcoming: nagpurAppointments,
        umredUpcoming: umredAppointments,
        percentageChange,
      }
    });

  } catch (err) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const getRecentAppointments = async (req, res) => {
  try {
    const recent = await Appointment.find()
      .sort({ createdAt: -1 })  // Latest first
      .limit(10);

    res.json({
      success: true,
      data: recent
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: err.message
    });
  }
};

//📌 Fetch ALL Appointments
export const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      appointments, // IMPORTANT
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const getAppointmentById = async (req, res) => {
  try {
    const a = await Appointment.findById(req.params.id);

    if (!a) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

    const appointment = {
      _id: a._id,
      patientName: a.patientName,
      contact: a.phone,
      appointmentType: a.appointmentType,
      date: a.date ? a.date.toISOString().slice(0, 10) : "",
      time: a.time,
      dateTime: `${a.date.toISOString().slice(0, 10)} , ${a.time}`,
      city: a.city,
      payment: a.paymentStatus,
      status: a.status,
    };

    res.json({
      success: true,
      appointment,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};



export const deleteAppointment = async (req, res) => {
  try {
    const id = req.params.id;

    const appointment = await Appointment.findByIdAndDelete(id);

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

    res.json({
      success: true,
      message: "Appointment deleted successfully",
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
export const updateAppointment = async (req, res) => {
  try {
    const id = req.params.id;

    const {
      patientName,
      contact,
      appointmentType,
      date,
      time,
      city,
      payment,
      status
    } = req.body;

    const updateData = {
      patientName,
      phone: contact,
      appointmentType,
      date: new Date(date),
      time,
      city,
      paymentStatus: payment,
      status
    };

    const updated = await Appointment.findByIdAndUpdate(id, updateData, {
      new: true
    });

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

    res.json({
      success: true,
      message: "Appointment updated successfully",
      appointment: updated,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};




