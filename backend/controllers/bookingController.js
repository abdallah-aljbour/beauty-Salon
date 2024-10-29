const Booking = require('../models/Booking');
const mongoose = require('mongoose');

exports.createBooking = async (req, res) => {
  try {
    const {
      userId,
      salonId,
      services,
      appointmentDate,
      appointmentTime,
      totalAmount,
      paymentDetails
    } = req.body;

    console.log('Received booking data:', req.body); // Debug log

    // Validate required fields
    if (!userId || !salonId || !services || !appointmentDate || !appointmentTime) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields',
        received: { userId, salonId, services, appointmentDate, appointmentTime }
      });
    }

    // Validate userId format
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid userId format'
      });
    }

    // Validate salonId format
    if (!mongoose.Types.ObjectId.isValid(salonId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid salonId format'
      });
    }

    // Create new booking
    const booking = new Booking({
      userId,
      salonId,
      services: services.map(service => ({
        serviceId: service.serviceId,
        name: service.name,
        price: service.price
      })),
      appointmentDate: new Date(appointmentDate),
      appointmentTime,
      totalAmount,
      paymentDetails: {
        cardHolderName: paymentDetails.cardHolderName,
        last4Digits: paymentDetails.cardNumber,
        paymentDate: new Date()
      },
      status: 'confirmed',
      paymentStatus: 'completed'
    });

    console.log('Creating booking:', booking); // Debug log

    await booking.save();

    // Populate salon details before sending response
    const populatedBooking = await Booking.findById(booking._id)
      .populate({
        path: 'salonId',
        populate: {
          path: 'owner',
          select: 'salonName'
        }
      });

    res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      booking: populatedBooking
    });

  } catch (error) {
    console.error('Booking creation error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create booking',
      error: error.message,
      stack: error.stack // Remove in production
    });
  }
};

exports.getBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.bookingId)
      .populate({
        path: 'salonId',
        populate: {
          path: 'owner',
          select: 'salonName'
        }
      });
    
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.bookingId);
    
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Only allow cancellation of upcoming bookings
    if (new Date(booking.appointmentDate) < new Date()) {
      return res.status(400).json({ message: 'Cannot cancel past bookings' });
    }

    booking.status = 'cancelled';
    await booking.save();

    res.json({ message: 'Booking cancelled successfully', booking });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getUserBookings = async (req, res) => {
  try {
    const { userId } = req.params;

    // Validate userId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid userId format'
      });
    }

    const bookings = await Booking.find({ userId })
      .populate({
        path: 'salonId',
        populate: {
          path: 'owner',
          select: 'salonName'
        }
      })
      .sort({ appointmentDate: -1 });

    res.json({
      success: true,
      bookings
    });
  } catch (error) {
    console.error('Error fetching user bookings:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch bookings',
      error: error.message
    });
  }
};

exports.getSalonBookings = async (req, res) => {
  try {
    const { salonId } = req.params;

    // Validate salonId
    if (!mongoose.Types.ObjectId.isValid(salonId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid salonId format'
      });
    }

    const bookings = await Booking.find({ salonId })
      .populate('userId', 'username email')
      .sort({ appointmentDate: -1 });

    res.json({
      success: true,
      bookings
    });
  } catch (error) {
    console.error('Error fetching salon bookings:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch bookings',
      error: error.message
    });
  }
}; 