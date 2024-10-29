const mongoose = require('mongoose')
const SalonProfile = require("../../models/SalonProfile");
const path = require("path");

exports.getRecommendedSalons = async (req, res) => {
  try {
    const salons = await SalonProfile.find({ isDeleted: false })
      .select("images city owner salonName")
      .populate("owner", "salonName")
      .limit(4)
      .lean();

    // Transform the data with proper image path handling
    const formattedSalons = salons.map((salon) => ({
      id: salon._id.toString(),
      salonName: salon.owner.salonName,
      image: salon.images && salon.images.length > 0 
        ? `/uploads/${path.basename(salon.images[0])}` 
        : null,
      city: salon.city,
    }));

    console.log("Sending formatted salons:", formattedSalons);
    res.json(formattedSalons);
  } catch (error) {
    console.error("Error fetching recommended salons:", error);
    res.status(500).json({ message: "Error fetching recommended salons" });
  }
};

exports.getSalonById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log('Received salon ID:', id);

    if (!id) {
      return res.status(400).json({ message: 'Salon ID is undefined' });
    }

    const salon = await SalonProfile.findById(id)
      .populate('owner', 'salonName')
      .lean();

    if (!salon) {
      return res.status(404).json({ message: 'Salon not found' });
    }

    // Transform the response with proper image path handling
    const transformedSalon = {
      ...salon,
      owner: {
        name: salon.owner?.salonName || null
      },
      // Format the images array properly
      images: salon.images?.map(img => `/uploads/${path.basename(img)}`) || [],
      // Keep only non-deleted services
      services: salon.services?.filter(service => !service.isDeleted) || []
    };

    console.log('Transformed salon data:', transformedSalon);
    console.log('Image paths:', salon.images);
    console.log('Transformed image paths:', transformedSalon.images);
    res.status(200).json(transformedSalon);
  } catch (error) {
    console.error('Error fetching salon:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getPopularSalons = async (req, res) => {
  try {
    const salons = await SalonProfile.find({ isDeleted: false })
      .select("images city owner salonName")
      .populate("owner", "salonName")
      .skip(4) // Skip the first 4 salons (used in recommended)
      .limit(4)
      .lean();

    const formattedSalons = salons.map((salon) => ({
      id: salon._id.toString(),
      salonName: salon.owner.salonName,
      image: salon.images && salon.images.length > 0 
        ? `/uploads/${path.basename(salon.images[0])}` 
        : null,
      city: salon.city,
    }));

    res.json(formattedSalons);
  } catch (error) {
    console.error("Error fetching popular salons:", error);
    res.status(500).json({ message: "Error fetching popular salons" });
  }
};

exports.getTrendingSalons = async (req, res) => {
  try {
    const salons = await SalonProfile.find({ isDeleted: false })
      .select("images city owner salonName")
      .populate("owner", "salonName")
      .skip(8) // Skip the first 8 salons (used in recommended and popular)
      .limit(4)
      .lean();

    const formattedSalons = salons.map((salon) => ({
      id: salon._id.toString(),
      salonName: salon.owner.salonName,
      image: salon.images && salon.images.length > 0 
        ? `/uploads/${path.basename(salon.images[0])}` 
        : null,
      city: salon.city,
    }));

    res.json(formattedSalons);
  } catch (error) {
    console.error("Error fetching trending salons:", error);
    res.status(500).json({ message: "Error fetching trending salons" });
  }
};
