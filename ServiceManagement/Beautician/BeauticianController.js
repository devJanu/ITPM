const Beautician = require("../Beautician/BeauticianModel");

exports.getAllBeauticians = async (req, res) => {
  try {
    const beauticians = await Beautician.find();
    res.json(beauticians);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getBeauticianById = async (req, res) => {
  try {
    const beautician = await Beautician.findById(req.params.id);
    if (!beautician) {
      return res.status(404).json({ message: "beautician not found" });
    }
    res.json(beautician);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createBeautician = async (req, res) => {
  try {
    const {
      customerId,
      name,
      email,
      mobile,
      methodOfContact,
      typeOfService,
      preferredStyle,
      allergies,
      dateAndTime,
      serviceDuration,
      additionalService,
      remarks,
    } = req.body;

    // Check if all required fields are provided
    if (
      !customerId ||
      !name ||
      !email ||
      !mobile ||
      !typeOfService ||
      !methodOfContact ||
      !preferredStyle ||
      !allergies ||
      !dateAndTime ||
      !additionalService ||
      !serviceDuration ||
      !remarks
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Validate mobile number
    if (!/^\d{10}$/.test(mobile)) {
      return res
        .status(400)
        .json({ error: "Mobile number must be 10 digits long" });
    }

    // Validate email format
    if (!isValidEmail(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    const beautician = new Beautician({
      customerId,
      name,
      email,
      mobile,
      methodOfContact,
      typeOfService,
      preferredStyle,
      allergies,
      dateAndTime,
      serviceDuration,
      additionalService,
      remarks,
    });
    await beautician.save();
    res
      .status(201)
      .json({ message: "beautician created successfully", beautician });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateBeautician = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      email,
      mobile,
      methodOfContact,
      typeOfService,
      preferredStyle,
      allergies,
      dateAndTime,
      serviceDuration,
      additionalService,
      remarks,
    } = req.body;

    // Validate all fields are provided
    if (
      !name ||
      !email ||
      !mobile ||
      !typeOfService ||
      !methodOfContact ||
      !preferredStyle ||
      !allergies ||
      !dateAndTime ||
      !additionalService ||
      !serviceDuration ||
      !remarks
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Validate mobile number
    if (!/^\d{10}$/.test(mobile)) {
      return res
        .status(400)
        .json({ error: "Mobile number must be 10 digits long" });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    const updatedbeautician = await Beautician.findByIdAndUpdate(
      id,
      {
        name,
        email,
        mobile,
        methodOfContact,
        typeOfService,
        preferredStyle,
        allergies,
        dateAndTime,
        serviceDuration,
        additionalService,
        remarks,
      },
      { new: true }
    );
    if (!updatedbeautician) {
      return res.status(404).json({ message: "beautician not found" });
    }
    res.json({
      message: "beautician updated successfully",
      beautician: updatedbeautician,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteBeautician = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedbeautician = await beautician.findByIdAndDelete(id);
    if (!deletedbeautician) {
      return res.status(404).json({ message: "beautician not found" });
    }
    res.json({ message: "beautician deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get All beautician

exports.getBeauticiansByCustomerId = async (req, res) => {
  try {
    const { customerId } = req.params;
    const beauticians = await beautician.find({ customerId });
    if (beauticians.length === 0) {
      return res
        .status(404)
        .json({ message: "No beauticians found for the provided customer ID" });
    }
    res.json(beauticians);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Functions

function isValidEmail(email) {
  // Regular expression to validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
