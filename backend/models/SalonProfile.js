const mongoose = require("mongoose");

const salonProfileSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SalonOwner",
    required: true,
  },
  images: [String],
  services: [
    {
      name: String,
      price: Number,
    },
  ],
  city: String,
  bio: String,
  location: {
    type: { type: String, default: "Point" },
    coordinates: [Number],
  },
  openingHours: {
    monday: { open: String, close: String, isOpen: Boolean },
    tuesday: { open: String, close: String, isOpen: Boolean },
    wednesday: { open: String, close: String, isOpen: Boolean },
    thursday: { open: String, close: String, isOpen: Boolean },
    friday: { open: String, close: String, isOpen: Boolean },
    saturday: { open: String, close: String, isOpen: Boolean },
    sunday: { open: String, close: String, isOpen: Boolean },
  },
});

const SalonProfile = mongoose.model("SalonProfile", salonProfileSchema);

module.exports = SalonProfile;
