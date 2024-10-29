// controllers/salonProfileController.js
const { json } = require("body-parser");
const SalonProfile = require("../../models/SalonProfile");

const createProfile = async (req, res) => {
  try {
    const images = req.files;
    const { city, bio } = req.body;
    let services, openingHours, location;

    if (typeof req.body.services === "string") {
      services = JSON.parse(req.body.services);
    } else {
      services = req.body.services; // It's already an object
    }

    if (typeof req.body.openingHours === "string") {
      openingHours = JSON.parse(req.body.openingHours);
    } else {
      openingHours = req.body.openingHours;
    }

    if (typeof req.body.location === "string") {
      location = JSON.parse(req.body.location);
    } else {
      location = req.body.location;
    }

    console.log("openingtime", openingHours);
    console.log("location", location);

    // Ensure that location has valid coordinates
    if (!location || !location.lat || !location.lng) {
      return res.status(400).json({ msg: "Invalid location data" });
    }

    // Check if a profile already exists for this owner
    const existingProfile = await SalonProfile.findOne({ owner: req.user.id });
    if (existingProfile) {
      return res
        .status(400)
        .json({ msg: "Profile already exists for this owner" });
    }

    // Create new profile
    const profile = new SalonProfile({
      owner: req.user.id,
      images: images.map((file) => file.path),
      services,
      city,
      bio,
      location: {
        type: "Point",
        coordinates: [location.lng, location.lat], // Ensure this order
      },
      openingHours,
    });

    await profile.save();
    res.status(201).json(profile);
  } catch (err) {
    console.error("Profile creation error:", err);
    res.status(500).json({ msg: "Server Error", error: err.message });
  }
};

const getServices = async (req, res) => {
  try {
    // Find the salon profile by owner ID
    const salonProfile = await SalonProfile.findOne({ owner: req.user.id });
    
    if (!salonProfile) {
      return res.status(404).json({ message: "Salon profile not found" });
    }

    // Return only active services
    const services = salonProfile.services.filter(service => !service.isDeleted);
    res.json({ services });
  } catch (err) {
    console.error("Error fetching services:", err);
    res.status(500).json({ message: "Server error" });
  }
};

const addService = async (req, res) => {
  try {
    const { name, price } = req.body;

    if (!name || !price) {
      return res.status(400).json({ message: "Name and price are required" });
    }

    const salonProfile = await SalonProfile.findOne({ owner: req.user.id });
    
    if (!salonProfile) {
      return res.status(404).json({ message: "Salon profile not found" });
    }

    const newService = { name, price };
    salonProfile.services.push(newService);
    await salonProfile.save();

    res.status(201).json({
      message: "Service added successfully",
      service: salonProfile.services[salonProfile.services.length - 1]
    });
  } catch (err) {
    console.error("Error adding service:", err);
    res.status(500).json({ message: "Server error" });
  }
};

const updateService = async (req, res) => {
  try {
    const { serviceId } = req.params;
    const { name, price } = req.body;

    const salonProfile = await SalonProfile.findOneAndUpdate(
      { 
        owner: req.user.id,
        "services._id": serviceId 
      },
      { 
        $set: { 
          "services.$.name": name,
          "services.$.price": price
        }
      },
      { new: true }
    );

    if (!salonProfile) {
      return res.status(404).json({ message: "Service not found" });
    }

    const updatedService = salonProfile.services.id(serviceId);
    res.json({ service: updatedService });
  } catch (err) {
    console.error("Error updating service:", err);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteService = async (req, res) => {
  try {
    const { serviceId } = req.params;

    const salonProfile = await SalonProfile.findOneAndUpdate(
      { owner: req.user.id },
      { $pull: { services: { _id: serviceId } } },
      { new: true }
    );

    if (!salonProfile) {
      return res.status(404).json({ message: "Service not found" });
    }

    res.json({ message: "Service deleted successfully" });
  } catch (err) {
    console.error("Error deleting service:", err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createProfile,
  getServices,
  updateService,
  deleteService,
  addService,
};
