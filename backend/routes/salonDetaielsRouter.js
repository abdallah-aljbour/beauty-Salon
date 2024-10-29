const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const SalonProfile = require('../models/SalonProfile');
const SalonOwner = require('../models/SalonOwner');

// Get salon owner profile
router.get('/profile', auth, async (req, res) => {
  try {
    const salonOwner = await SalonOwner.findById(req.user.id)
      .select('-password')
      .lean();

    if (!salonOwner) {
      return res.status(404).json({ message: 'Salon owner not found' });
    }

    // Get salon profile if it exists
    const salonProfile = await SalonProfile.findOne({ owner: req.user.id }).lean();

    res.json({
      ...salonOwner,
      profile: salonProfile || null
    });
  } catch (err) {
    console.error('Error in salon owner profile route:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get salon details
router.get('/salon/:id', async (req, res) => {
  try {
    const salonProfile = await SalonProfile.findById(req.params.id)
      .populate('owner', 'salonName email')
      .lean();

    if (!salonProfile) {
      return res.status(404).json({ message: 'Salon not found' });
    }

    res.json(salonProfile);
  } catch (err) {
    console.error('Error fetching salon details:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update salon owner profile
router.put('/profile', auth, async (req, res) => {
  try {
    const { username, salonName } = req.body;
    console.log('Received update request:', req.body); // Debug log

    // Find the salon owner
    const salonOwner = await SalonOwner.findById(req.user.id);
    if (!salonOwner) {
      return res.status(404).json({ message: 'Salon owner not found' });
    }

    // Update the fields if provided
    if (username) salonOwner.username = username;
    if (salonName) salonOwner.salonName = salonName;

    // Save the changes
    await salonOwner.save();

    // Return the updated owner without password
    const updatedOwner = await SalonOwner.findById(req.user.id)
      .select('-password')
      .lean();

    console.log('Updated owner:', updatedOwner); // Debug log
    res.json(updatedOwner);
  } catch (err) {
    console.error('Error updating salon owner profile:', err);
    if (err.code === 11000) {
      return res.status(400).json({ message: 'Username or salon name already exists' });
    }
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete salon profile
router.delete('/profile', auth, async (req, res) => {
  try {
    const result = await SalonProfile.findOneAndDelete({ owner: req.user.id });
    if (!result) {
      return res.status(404).json({ message: 'Salon profile not found' });
    }
    res.json({ message: 'Salon profile deleted successfully' });
  } catch (err) {
    console.error('Error deleting salon profile:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add this route to get opening hours for a specific salon
router.get('/opening-hours', auth, async (req, res) => {
  try {
    const salonProfile = await SalonProfile.findOne({ owner: req.user.id });
    
    if (!salonProfile) {
      return res.status(404).json({ message: 'Salon profile not found' });
    }

    console.log('Found opening hours:', salonProfile.openingHours); // Debug log
    res.json({ openingHours: salonProfile.openingHours });
  } catch (err) {
    console.error('Error fetching opening hours:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update opening hours
router.put('/opening-hours', auth, async (req, res) => {
  try {
    const { openingHours } = req.body;
    console.log('Received opening hours update:', openingHours); // Debug log

    const salonProfile = await SalonProfile.findOne({ owner: req.user.id });
    
    if (!salonProfile) {
      return res.status(404).json({ message: 'Salon profile not found' });
    }

    salonProfile.openingHours = openingHours;
    await salonProfile.save();

    console.log('Updated opening hours:', salonProfile.openingHours); // Debug log
    res.json({ 
      message: 'Opening hours updated successfully',
      openingHours: salonProfile.openingHours 
    });
  } catch (err) {
    console.error('Error updating opening hours:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
