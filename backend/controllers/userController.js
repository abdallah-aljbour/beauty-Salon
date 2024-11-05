const User = require('../models/User');
const Booking = require('../models/Booking');

exports.getUserProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    
    // Check if user is authorized to access this profile
    if (req.user.id !== userId) {
      return res.status(403).json({ message: 'Not authorized to access this profile' });
    }

    const user = await User.findById(userId).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getUserBookings = async (req, res) => {
  try {
    const { userId } = req.params;
    
    // Check if user is authorized to access these bookings
    if (req.user.id !== userId) {
      return res.status(403).json({ message: 'Not authorized to access these bookings' });
    }
    
    const bookings = await Booking.find({ userId })
      .populate({
        path: 'salonId',
        populate: {
          path: 'owner',
          select: 'salonName email'
        }
      })
      .sort({ appointmentDate: -1 });

    res.json({
      success: true,
      bookings: bookings
    });
  } catch (error) {
    console.error('Error fetching user bookings:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateUserProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    
    // Check if user is authorized to update this profile
    if (req.user.id !== userId) {
      return res.status(403).json({ message: 'Not authorized to update this profile' });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: req.body },
      { new: true }
    ).select('-password');

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(updatedUser);
  } catch (error) {
    console.error('Error updating user profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.cancelBooking = async (req, res) => {
  try {
    const { userId, bookingId } = req.params;
    
    // Check if user is authorized to cancel this booking
    if (req.user.id !== userId) {
      return res.status(403).json({ message: 'Not authorized to cancel this booking' });
    }

    const booking = await Booking.findOne({ _id: bookingId, userId });
    
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    if (booking.status === 'cancelled') {
      return res.status(400).json({ message: 'Booking is already cancelled' });
    }

    booking.status = 'cancelled';
    await booking.save();

    res.json({ message: 'Booking cancelled successfully', booking });
  } catch (error) {
    console.error('Error cancelling booking:', error);
    res.status(500).json({ message: 'Server error' });
  }
}; 