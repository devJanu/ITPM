const Booking = require("../BookingManagement/BookingModel");

exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: "booking not found" });
    }
    res.json(booking);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createBooking = async (req, res) => {
  try {
    const {
      customerId,
      name,
      address,
      mobile,
      nic,
      eventDate,
      guestCount,
      foodMenu,
      alcoholService,
      advancePayment,
    } = req.body;

    // Check if all required fields are provided
    if (
      !customerId ||
      !name ||
      !address ||
      !mobile ||
      !nic ||
      !eventDate ||
      !guestCount ||
      !foodMenu ||
      advancePayment === undefined
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Validate mobile number
    if (!/^\d{10}$/.test(mobile)) {
      return res
        .status(400)
        .json({ error: "Mobile number must be 10 digits long" });
    }

    // Validate NIC number
    if (!/^([0-9]{9}[vV]|[0-9]{12})$/.test(nic)) {
      return res.status(400).json({
        error: "Invalid NIC",
      });
    }
    const booking = new Booking({
      customerId,
      name,
      address,
      mobile,
      nic,
      eventDate,
      guestCount,
      foodMenu,
      alcoholService,
      advancePayment,
    });
    await booking.save();
    res.status(201).json({ message: "Booking created successfully", booking });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// exports.updateBooking = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const {
//       name,
//       address,
//       mobile,
//       nic,
//       eventDate,
//       guestCount,
//       foodMenu,
//       alcoholService,
//       advancePayment,
//     } = req.body;
//     const updatedbooking = await Booking.findByIdAndUpdate(
//       id,
//       {
//         name,
//         address,
//         mobile,
//         nic,
//         eventDate,
//         guestCount,
//         foodMenu,
//         alcoholService,
//         advancePayment,
//       },
//       { new: true }
//     );
//     if (!updatedbooking) {
//       return res.status(404).json({ message: "Booking not found" });
//     }
//     res.json({
//       message: "Booking updated successfully",
//       booking: updatedbooking,
//     });
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// };
exports.updateBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      address,
      mobile,
      nic,
      eventDate,
      guestCount,
      foodMenu,
      alcoholService,
      advancePayment,
    } = req.body;

    // Validate all fields are provided
    if (
      !name ||
      !address ||
      !mobile ||
      !nic ||
      !eventDate ||
      !guestCount ||
      !foodMenu ||
      advancePayment === undefined
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Validate mobile number
    if (!/^\d{10}$/.test(mobile)) {
      return res
        .status(400)
        .json({ error: "Mobile number must be 10 digits long" });
    }

    // Validate NIC number
    if (!/^([0-9]{9}[vV]|[0-9]{12})$/.test(nic)) {
      return res.status(400).json({
        error: "Invalid NIC ",
      });
    }

    const updatedbooking = await Booking.findByIdAndUpdate(
      id,
      {
        name,
        address,
        mobile,
        nic,
        eventDate,
        guestCount,
        foodMenu,
        alcoholService,
        advancePayment,
      },
      { new: true }
    );
    if (!updatedbooking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.json({
      message: "Booking updated successfully",
      booking: updatedbooking,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedbooking = await Booking.findByIdAndDelete(id);
    if (!deletedbooking) {
      return res.status(404).json({ message: "booking not found" });
    }
    res.json({ message: "booking deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get All booking

exports.getBookingsByCustomerId = async (req, res) => {
  try {
    const { customerId } = req.params;
    const bookings = await Booking.find({ customerId });
    if (bookings.length === 0) {
      return res
        .status(404)
        .json({ message: "No bookings found for the provided customer ID" });
    }
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
