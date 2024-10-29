const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const SalonOwner = require('../models/SalonOwner');

// Get salon owner profile
router.get('/profile', auth, async (req, res) => {
  try {
    const salonOwner = await SalonOwner.findById(req.user.id).select('-password');
    if (!salonOwner) {
      return res.status(404).json({ message: 'Salon owner not found' });
    }
    res.json(salonOwner);
  } catch (err) {
    console.error('Error in salon owner profile route:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Verify password
router.post('/verify-password', auth, async (req, res) => {
  try {
    const { currentPassword } = req.body;
    const salonOwner = await SalonOwner.findById(req.user.id);
    
    if (!salonOwner) {
      return res.status(404).json({ message: 'Salon owner not found' });
    }

    const isMatch = await salonOwner.comparePassword(currentPassword);
    res.json({ verified: isMatch });
  } catch (err) {
    console.error('Error verifying password:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update salon owner profile
router.put('/profile', auth, async (req, res) => {
  try {
    const salonOwner = await SalonOwner.findById(req.user.id);
    if (!salonOwner) {
      return res.status(404).json({ message: 'Salon owner not found' });
    }

    const { username, salonName, currentPassword, newPassword } = req.body;
    
    // Log the received data
    console.log('Update request received:', { username, salonName });

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
    
    console.log('Updated profile:', updatedOwner);
    res.json(updatedOwner);
  } catch (err) {
    console.error('Error updating profile:', err);
    if (err.code === 11000) {
      // Duplicate key error
      return res.status(400).json({ 
        message: 'Username or salon name already exists' 
      });
    }
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 