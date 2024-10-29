const express = require('express');
const router = express.Router();
const { getUserProfile, getUserBookings } = require('../controllers/userController');
const auth = require('../middleware/auth');

// Get user profile
router.get('/:userId', auth, getUserProfile);

// Get user bookings
router.get('/:userId/bookings', auth, getUserBookings);

module.exports = router; 