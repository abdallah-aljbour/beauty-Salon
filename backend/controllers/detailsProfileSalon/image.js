// controllers/salonController.js

const SalonProfile = require("../../models/SalonProfile");

exports.getSalonById = async (req, res) => {
    try {
      const { id } = req.params;
      console.log('Received salon ID:', id); // Log the received ID
  
      // Check if the ID is undefined
      if (id === undefined) {
        console.log('Salon ID is undefined');
        return res.status(400).json({ message: 'Salon ID is undefined' });
      }
  
      // Check if the ID is valid
      if (!mongoose.Types.ObjectId.isValid(id)) {
        console.log('Invalid salon ID format');
        return res.status(400).json({ message: 'Invalid salon ID format' });
      }
  
      const salon = await SalonProfile.findById(id).populate('owner', 'name');
      
      if (!salon) {
        console.log('Salon not found');
        return res.status(404).json({ message: 'Salon not found' });
      }
  
      console.log('Salon found:', salon);
      res.status(200).json(salon);
    } catch (error) {
      console.error('Error fetching salon:', error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };
exports.getRecommendedSalons = async (req, res) => {
  try {
    // You can implement your own logic for recommended salons
    // For now, we'll just fetch the first 5 non-deleted salons
    const salons = await SalonProfile.find({ isDeleted: false })
      .populate("owner", "name")
      .limit(5);

    res.status(200).json(salons);
  } catch (error) {
    console.error("Error fetching recommended salons:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
