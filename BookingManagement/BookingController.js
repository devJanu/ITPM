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
    res.status(201).json(booking);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

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
    res.json(updatedbooking);
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
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
