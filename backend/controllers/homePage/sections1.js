const mongoose =require('mongoose')
const SalonProfile = require("../../models/SalonProfile");
const path = require("path");

exports.getRecommendedSalons = async (req, res) => {
  try {
    const salons = await SalonProfile.find({ isDeleted: false })
      .select("images city owner salonName")
      .populate("owner", "salonName")
      .limit(4)
      .lean();

    // Transform the data with proper image path handling
    const formattedSalons = salons.map((salon) => ({
      id: salon._id.toString(),
      salonName: salon.owner.salonName,
      image: salon.images && salon.images.length > 0 
        ? `/uploads/${path.basename(salon.images[0])}` 
        : null,
      city: salon.city,
    }));

    console.log("Sending formatted salons:", formattedSalons); // Debug log
    res.json(formattedSalons);
  } catch (error) {
    console.error("Error fetching recommended salons:", error);
    res.status(500).json({ message: "Error fetching recommended salons" });
  }
};

exports.getSalonById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log('Received salon ID:', id);

    if (!id) {
      console.log('Salon ID is undefined');
      return res.status(400).json({ message: 'Salon ID is undefined' });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.log('Invalid salon ID format');
      return res.status(400).json({ message: 'Invalid salon ID format' });
    }

    const salon = await SalonProfile.findById(id)
      .populate('owner', 'salonName') // Make sure this populate is working
      .lean();

    if (!salon) {
      console.log('Salon not found');
      return res.status(404).json({ message: 'Salon not found' });
    }

    // Transform the response with proper image path handling
    const transformedSalon = {
      ...salon,
      id: salon._id.toString(),
      image: salon.images && salon.images.length > 0 
        ? `/uploads/${path.basename(salon.images[0])}` 
        : null,
      images: salon.images 
        ? salon.images.map(img => `/uploads/${path.basename(img)}`)
        : [],
      owner: {
        name: salon.owner ? salon.owner.salonName : null // This is where the salonName is set
      },
      // Add closingTime here if it's available in your SalonProfile schema
      closingTime: salon.closingTime // Ensure this field exists in your SalonProfile schema
    };

    console.log('Transformed salon data:', transformedSalon);
    res.status(200).json(transformedSalon);
  } catch (error) {
    console.error('Error fetching salon:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
