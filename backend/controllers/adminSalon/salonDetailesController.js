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
      return res.status(400).json({ msg: "Profile already exists for this owner" });
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
    // Find the profile by the owner's ID
    const profile = await SalonProfile.findOne({ owner: req.user.id });

    // Check if the profile exists
    if (!profile) {
      return res.status(404).json({ msg: "Profile not found" });
    }

    // Map over the services to retrieve only name and price
    const services = profile.services.map(({ name, price }) => ({
      name,
      price,
    }));

    // Send back the filtered services
    res.json({ services });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

const updateService = async (req, res) => {
  const { index } = req.params;
  const { name, price } = req.body;
  try {
    const profile = await SalonProfile.findOne({ owner: req.user.id });
    if (!profile) {
      return res.status(404).json({ msg: "Profile not found" });
    }
    if (index < 0 || index >= profile.services.length) {
      return res.status(400).json({ msg: "Invalid service index" });
    }
    profile.services[index] = { name, price };
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server Error" });
  }
};

module.exports = {
  createProfile,
  getServices,
  updateService,
};
