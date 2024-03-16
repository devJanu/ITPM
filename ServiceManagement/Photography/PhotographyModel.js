const mongoose = require("mongoose");

const photographySchema = new mongoose.Schema({
  customerId: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  mobile: { type: String, required: true },
  address: { type: String, required: true },
  typeOfEvent: { type: String, required: true },
  eventDate: { type: String, required: true },
  contactMethod: { type: String, required: true },
  totalGuest: { type: String, required: true },
  preferredSession: { type: String, required: true },
  desiredPhotography: { type: String, required: true },
  additionalService: { type: String, required: true },
  package: { type: String, required: true },
  remarks: { type: String, required: true },
});

const Photography = mongoose.model("Photography", photographySchema);

module.exports = Photography;
