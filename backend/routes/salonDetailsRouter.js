const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const SalonProfile = require('../models/SalonProfile');
const SalonOwner = require('../models/SalonOwner');

// Get salon owner profile
router.get('/profile', auth, async (req, res) => {
  try {
    console.log('Fetching profile for user:', req.user.id); // Debug log

    const salonOwner = await SalonOwner.findById(req.user.id)
      .select('-password')
      .lean();

    if (!salonOwner) {
      return res.status(404).json({ message: 'Salon owner not found' });
    }

    // Get salon profile if it exists
    const salonProfile = await SalonProfile.findOne({ owner: req.user.id }).lean();

    const profileData = {
      ...salonOwner,
      profile: salonProfile || null
    };

    console.log('Sending profile data:', profileData); // Debug log
    res.json(profileData);
  } catch (err) {
    console.error('Error in salon owner profile route:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get salon services
router.get('/services', auth, async (req, res) => {
  try {
    const salonProfile = await SalonProfile.findOne({ owner: req.user.id });
    
    if (!salonProfile) {
      return res.status(404).json({ message: 'Salon profile not found' });
    }

    console.log('Found salon profile:', salonProfile);

    // Return only active services
    const services = salonProfile.services.filter(service => !service.isDeleted);
    res.json({ 
      services,
      success: true 
    });
  } catch (err) {
    console.error('Error fetching services:', err);
    res.status(500).json({ 
      message: 'Error fetching services',
      error: err.message,
      success: false 
    });
  }
});

// Add service
router.post('/services', auth, async (req, res) => {
  try {
    const { name, price } = req.body;
    const salonProfile = await SalonProfile.findOne({ owner: req.user.id });
    
    if (!salonProfile) {
      return res.status(404).json({ message: 'Salon profile not found' });
    }

    salonProfile.services.push({ name, price });
    await salonProfile.save();

    res.status(201).json({
      service: salonProfile.services[salonProfile.services.length - 1],
      success: true
    });
  } catch (err) {
    console.error('Error adding service:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update service
router.put('/services/:serviceId', auth, async (req, res) => {
  try {
    const { name, price } = req.body;
    const salonProfile = await SalonProfile.findOneAndUpdate(
      { 
        owner: req.user.id,
        'services._id': req.params.serviceId 
      },
      { 
        $set: { 
          'services.$.name': name,
          'services.$.price': price
        }
      },
      { new: true }
    );
    
    if (!salonProfile) {
      return res.status(404).json({ message: 'Service not found' });
    }
    
    res.json({ 
      services: salonProfile.services,
      success: true 
    });
  } catch (err) {
    console.error('Error updating service:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete service
router.delete('/services/:serviceId', auth, async (req, res) => {
  try {
    const salonProfile = await SalonProfile.findOneAndUpdate(
      { owner: req.user.id },
      { $pull: { services: { _id: req.params.serviceId } } },
      { new: true }
    );
    
    if (!salonProfile) {
      return res.status(404).json({ message: 'Service not found' });
    }
    
    res.json({ 
      message: 'Service deleted successfully',
      success: true 
    });
  } catch (err) {
    console.error('Error deleting service:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get opening hours
router.get('/opening-hours', auth, async (req, res) => {
  try {
    const salonProfile = await SalonProfile.findOne({ owner: req.user.id });
    
    if (!salonProfile) {
      return res.status(404).json({ message: 'Salon profile not found' });
    }

    console.log('Found opening hours:', salonProfile.openingHours); // Debug log
    res.json({ 
      openingHours: salonProfile.openingHours || {
        monday: { open: '', close: '', isOpen: true },
        tuesday: { open: '', close: '', isOpen: true },
        wednesday: { open: '', close: '', isOpen: true },
        thursday: { open: '', close: '', isOpen: true },
        friday: { open: '', close: '', isOpen: true },
        saturday: { open: '', close: '', isOpen: true },
        sunday: { open: '', close: '', isOpen: true }
      }
    });
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

// Update salon owner profile
router.put('/profile', auth, async (req, res) => {
  try {
    const { username, salonName, currentPassword, newPassword } = req.body;
    console.log('Update request received:', { username, salonName }); // Debug log

    // Find the salon owner
    const salonOwner = await SalonOwner.findById(req.user.id);
    if (!salonOwner) {
      return res.status(404).json({ message: 'Salon owner not found' });
    }

    // Update basic fields if provided
    if (username) salonOwner.username = username;
    if (salonName) salonOwner.salonName = salonName;

    // Handle password update if both passwords are provided
    if (currentPassword && newPassword) {
      const isMatch = await salonOwner.comparePassword(currentPassword);
      if (!isMatch) {
        return res.status(400).json({ message: 'Current password is incorrect' });
      }
      salonOwner.password = newPassword;
    }

    await salonOwner.save();

    // Return updated user without password
    const updatedOwner = await SalonOwner.findById(req.user.id)
      .select('-password')
      .lean();

    console.log('Updated owner:', updatedOwner); // Debug log
    res.json(updatedOwner);
  } catch (err) {
    console.error('Error updating profile:', err);
    if (err.code === 11000) {
      return res.status(400).json({ message: 'Username or salon name already exists' });
    }
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 