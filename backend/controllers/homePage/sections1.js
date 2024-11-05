const mongoose = require('mongoose')
const SalonProfile = require("../../models/SalonProfile");
const path = require("path");

exports.getRecommendedSalons = async (req, res) => {
  try {
    const salons = await SalonProfile.find({ isDeleted: false })
      .populate({
        path: 'owner',
        model: 'SalonOwner',
        select: 'salonName email'
      })
      .select('images city location services owner');

    const formattedSalons = salons.map(salon => {
      const imagePath = salon.images && salon.images.length > 0 
        ? salon.images[0].startsWith('/uploads/') 
          ? salon.images[0] 
          : `/uploads/${path.basename(salon.images[0])}`
        : null;

      console.log("Salon owner data:", salon.owner);

      return {
        id: salon._id,
        salonName: salon.owner ? salon.owner.salonName : 'Unnamed Salon',
        image: imagePath,
        city: salon.city,
        services: salon.services,
        location: salon.location ? {
          lat: salon.location.coordinates[1],
          lng: salon.location.coordinates[0]
        } : null
      };
    });

    console.log("Formatted salons:", formattedSalons);
    res.json(formattedSalons);
  } catch (error) {
    console.error('Error fetching recommended salons:', error);
    res.status(500).json({ 
      message: 'Error fetching recommended salons',
      error: error.message 
    });
  }
};

exports.getSalonById = async (req, res) => {
  try {
    const salon = await SalonProfile.findById(req.params.id)
      .populate({
        path: 'owner',
        model: 'SalonOwner',
        select: 'salonName email'
      });

    if (!salon) {
      return res.status(404).json({ message: 'Salon not found' });
    }

    const formattedSalon = {
      id: salon._id,
      salonName: salon.owner ? salon.owner.salonName : 'Unnamed Salon',
      images: salon.images,
      city: salon.city,
      bio: salon.bio,
      services: salon.services,
      location: {
        lat: salon.location.coordinates[1],
        lng: salon.location.coordinates[0]
      },
      openingHours: salon.openingHours
    };

    res.json(formattedSalon);
  } catch (error) {
    console.error('Error fetching salon by ID:', error);
    res.status(500).json({ 
      message: 'Error fetching salon details',
      error: error.message 
    });
  }
};

exports.getPopularSalons = async (req, res) => {
  try {
    const salons = await SalonProfile.find({ isDeleted: false })
      .populate('owner', 'salonName email')
      .select('images city location services')
      .limit(6);

    const formattedSalons = salons.map(salon => ({
      id: salon._id,
      salonName: salon.owner?.salonName || 'Unnamed Salon',
      image: salon.images && salon.images.length > 0 ? salon.images[0] : null,
      city: salon.city,
      services: salon.services,
      location: {
        lat: salon.location.coordinates[1],
        lng: salon.location.coordinates[0]
      }
    }));

    res.json(formattedSalons);
  } catch (error) {
    console.error('Error fetching popular salons:', error);
    res.status(500).json({ 
      message: 'Error fetching popular salons',
      error: error.message 
    });
  }
};

exports.getTrendingSalons = async (req, res) => {
  try {
    const salons = await SalonProfile.find({ isDeleted: false })
      .populate('owner', 'salonName email')
      .select('images city location services')
      .limit(6);

    const formattedSalons = salons.map(salon => ({
      id: salon._id,
      salonName: salon.owner?.salonName || 'Unnamed Salon',
      image: salon.images && salon.images.length > 0 ? salon.images[0] : null,
      city: salon.city,
      services: salon.services,
      location: {
        lat: salon.location.coordinates[1],
        lng: salon.location.coordinates[0]
      }
    }));

    res.json(formattedSalons);
  } catch (error) {
    console.error('Error fetching trending salons:', error);
    res.status(500).json({ 
      message: 'Error fetching trending salons',
      error: error.message 
    });
  }
};
