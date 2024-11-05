const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Booking = require('../models/Booking');
const SalonProfile = require('../models/SalonProfile');

// Create a new booking
router.post('/', auth, async (req, res) => {
  try {
    const { salonId, serviceId, date, time } = req.body;

    // Validate required fields
    if (!salonId || !serviceId || !date || !time) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if salon exists
    const salon = await SalonProfile.findById(salonId);
    if (!salon) {
      return res.status(404).json({ message: 'Salon not found' });
    }

    // Create new booking
    const booking = new Booking({
      user: req.user.id,
      salon: salonId,
      service: serviceId,
      date,
      time,
      status: 'pending'
    });

    await booking.save();

    res.status(201).json(booking);
  } catch (err) {
    console.error('Error creating booking:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user's bookings
router.get('/:user', auth, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id })
      .populate('salon', 'salonName')
      .populate('service', 'name price')
      .sort({ date: -1 });
    res.json(bookings);
  } catch (err) {
    console.error('Error fetching bookings:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get salon's bookings
router.get('/salon', auth, async (req, res) => {
  try {
    const salon = await SalonProfile.findOne({ owner: req.user.id });
    if (!salon) {
      return res.status(404).json({ message: 'Salon not found' });
    }

    const bookings = await Booking.find({ salon: salon._id })
      .populate('user', 'username email')
      .populate('service', 'name price')
      .sort({ date: -1 });
    res.json(bookings);
  } catch (err) {
    console.error('Error fetching salon bookings:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update booking status
router.put('/:id/status', auth, async (req, res) => {
  try {
    const { status } = req.body;
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Verify salon owner
    const salon = await SalonProfile.findOne({ owner: req.user.id });
    if (!salon || salon._id.toString() !== booking.salon.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    booking.status = status;
    await booking.save();

    res.json(booking);
  } catch (err) {
    console.error('Error updating booking:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Cancel booking
router.delete('/:id', auth, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Verify user owns the booking
    if (booking.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await booking.remove();
    res.json({ message: 'Booking cancelled successfully' });
  } catch (err) {
    console.error('Error cancelling booking:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 