const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { 
  getUserProfile, 
  getUserBookings, 
  updateUserProfile,
  cancelBooking 
} = require('../controllers/userController');

// Get user profile
router.get('/:userId', auth, getUserProfile);

// Update user profile
router.put('/:userId', auth, updateUserProfile);

// Get user bookings
router.get('/:userId/bookings', auth, getUserBookings);

// Cancel booking
router.put('/:userId/bookings/:bookingId/cancel', auth, cancelBooking);

module.exports = router; 