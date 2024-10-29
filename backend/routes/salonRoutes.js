const express = require('express');
const router = express.Router();
const SalonProfile = require('../models/SalonProfile');
const path = require('path');

// Get all salons
router.get('/salons', async (req, res) => {
  try {
    const salons = await SalonProfile.find({ isDeleted: false })
      .select('images city owner')
      .populate('owner', 'salonName')
      .lean();

    const formattedSalons = salons.map(salon => {
      // Get the first image path and ensure it's properly formatted
      let imagePath = null;
      if (salon.images && salon.images.length > 0) {
        // Extract just the filename from the full path
        const filename = path.basename(salon.images[0]);
        imagePath = `/uploads/${filename}`;
      }

      return {
        id: salon._id.toString(),
        salonName: salon.owner?.salonName || 'Unnamed Salon',
        image: imagePath,
        city: salon.city || 'Location not specified',
      };
    });

    console.log('Formatted salons:', formattedSalons); // For debugging
    res.json(formattedSalons);
  } catch (error) {
    console.error('Error fetching salons:', error);
    res.status(500).json({ message: 'Error fetching salons' });
  }
});

// Add new route to get salon by ID
router.get('/salons/:id', async (req, res) => {
  try {
    const salon = await SalonProfile.findById(req.params.id)
      .populate('owner', 'salonName')
      .lean();

    if (!salon) {
      return res.status(404).json({ message: 'Salon not found' });
    }

    // Format the response
    const formattedSalon = {
      id: salon._id.toString(),
      salonName: salon.owner?.salonName,
      images: salon.images?.map(img => `/uploads/${path.basename(img)}`),
      city: salon.city,
      bio: salon.bio,
      services: salon.services,
      openingHours: salon.openingHours,
      location: salon.location,
      owner: {
        name: salon.owner?.salonName
      }
    };

    res.json(formattedSalon);
  } catch (error) {
    console.error('Error fetching salon details:', error);
    res.status(500).json({ message: 'Error fetching salon details' });
  }
});

module.exports = router; 