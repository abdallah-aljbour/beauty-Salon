const SalonProfile = require("../../models/SalonProfile");

const createSalonDetails = async (req, res) => {
  try {
    console.log("Request body:", req.body);
    console.log("Request files:", req.files);

    const { city, bio, services, openingHours, location } = req.body;
    const files = req.files;

    let parsedLocation, parsedServices, parsedOpeningHours;

    try {
      // Parse JSON strings
      parsedLocation = JSON.parse(location);
      parsedServices = services ? JSON.parse(services) : [];
      parsedOpeningHours = openingHours ? JSON.parse(openingHours) : {};

      // Create new salon profile
      const profile = new SalonProfile({
        owner: req.user.id,
        images: files ? files.map(file => `/uploads/${file.filename}`) : [],
        services: parsedServices,
        city: city || '',
        bio: bio || '',
        location: {
          type: "Point",
          coordinates: [
            Number(parsedLocation.lng),
            Number(parsedLocation.lat)
          ]
        },
        openingHours: parsedOpeningHours
      });

      console.log("Profile to save:", JSON.stringify(profile, null, 2));

      const savedProfile = await profile.save();
      res.status(201).json({
        success: true,
        message: "Salon profile created successfully",
        profile: savedProfile
      });

    } catch (parseError) {
      console.error("Error parsing data:", parseError);
      return res.status(400).json({
        success: false,
        message: "Invalid data format",
        details: parseError.message
      });
    }

  } catch (err) {
    console.error("Profile creation error:", err);
    res.status(500).json({
      success: false,
      message: "Error creating salon profile",
      error: err.message
    });
  }
};

const getSalonServices = async (req, res) => {
  try {
    const salonProfile = await SalonProfile.findOne({ owner: req.user.id });
    if (!salonProfile) {
      return res.status(404).json({ message: "Salon profile not found" });
    }

    const services = salonProfile.services.filter(
      (service) => !service.isDeleted
    );
    res.json({ services });
  } catch (err) {
    console.error("Error fetching services:", err);
    res.status(500).json({ message: "Server error" });
  }
};

const addServiceToSalon = async (req, res) => {
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
      service: salonProfile.services[salonProfile.services.length - 1],
    });
  } catch (err) {
    console.error("Error adding service:", err);
    res.status(500).json({ message: "Server error" });
  }
};

const updateSalonService = async (req, res) => {
  try {
    const { serviceId } = req.params;
    const { name, price } = req.body;

    const salonProfile = await SalonProfile.findOneAndUpdate(
      { owner: req.user.id, "services._id": serviceId },
      { $set: { "services.$.name": name, "services.$.price": price } },
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

const deleteSalonService = async (req, res) => {
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

const updateOpeningHours = async (req, res) => {
  try {
    const { openingHours } = req.body;
    const salonProfile = await SalonProfile.findOne({ owner: req.user.id });

    if (!salonProfile) {
      return res.status(404).json({ message: "Salon profile not found" });
    }

    salonProfile.openingHours = openingHours;
    await salonProfile.save();

    res.json({
      message: "Opening hours updated successfully",
      openingHours: salonProfile.openingHours,
    });
  } catch (err) {
    console.error("Error updating opening hours:", err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createSalonDetails,
  getSalonServices,
  addServiceToSalon,
  updateSalonService,
  deleteSalonService,
  updateOpeningHours,
};
