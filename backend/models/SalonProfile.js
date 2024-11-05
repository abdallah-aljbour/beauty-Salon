const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
});

const openingHoursSchema = new mongoose.Schema({
  open: String,
  close: String,
  isOpen: {
    type: Boolean,
    default: true
  }
});

const salonProfileSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SalonOwner",
    required: true,
  },
  images: [String],
  services: [serviceSchema],
  city: String,
  bio: String,
  location: {
    type: { type: String, default: "Point" },
    coordinates: [Number],
  },
  openingHours: {
    monday: openingHoursSchema,
    tuesday: openingHoursSchema,
    wednesday: openingHoursSchema,
    thursday: openingHoursSchema,
    friday: openingHoursSchema,
    saturday: openingHoursSchema,
    sunday: openingHoursSchema
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

// Add a pre-save middleware to ensure services array exists
salonProfileSchema.pre('save', function(next) {
  try {
    if (!this.services) {
      this.services = [];
    }
    if (!this.images) {
      this.images = [];
    }
    if (!this.location) {
      throw new Error('Location is required');
    }
    next();
  } catch (error) {
    next(error);
  }
});

// Add this index for location queries
salonProfileSchema.index({ location: "2dsphere" });

const SalonProfile = mongoose.model("SalonProfile", salonProfileSchema);
module.exports = SalonProfile;

