const SalonOwner = require("../../models/SalonOwner");
const bcrypt = require("bcrypt");

const getSalonOwnerProfile = async (req, res) => {
  try {
    console.log("Fetching profile for user ID:", req.user.id); // Debug log

    const salonOwner = await SalonOwner.findById(req.user.id).select("-password");
    if (!salonOwner) {
      return res.status(404).json({ message: "Salon owner not found" });
    }

    console.log("Found salon owner profile:", salonOwner); // Debug log
    res.json(salonOwner);
  } catch (err) {
    console.error("Error in getSalonOwnerProfile:", err);
    res.status(500).json({ message: "Server Error" });
  }
};

const updateSalonOwnerProfile = async (req, res) => {
  try {
    const { username, salonName, currentPassword, newPassword } = req.body;
    console.log("Update request body:", req.body); // Debug log

    const salonOwner = await SalonOwner.findById(req.user.id);
    if (!salonOwner) {
      return res.status(404).json({ message: "Salon owner not found" });
    }

    // Update basic info
    if (username) salonOwner.username = username;
    if (salonName) salonOwner.salonName = salonName;

    // Handle password update if provided
    if (currentPassword && newPassword) {
      const isMatch = await bcrypt.compare(currentPassword, salonOwner.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Current password is incorrect" });
      }

      const salt = await bcrypt.genSalt(10);
      salonOwner.password = await bcrypt.hash(newPassword, salt);
    }

    await salonOwner.save();
    
    // Return salon owner without password
    const updatedSalonOwner = await SalonOwner.findById(salonOwner._id).select("-password");
    res.json(updatedSalonOwner);
  } catch (err) {
    console.error("Error in updateSalonOwnerProfile:", err);
    res.status(500).json({ message: "Server Error" });
  }
};

const verifyPassword = async (req, res) => {
  try {
    const { currentPassword } = req.body;
    const salonOwner = await SalonOwner.findById(req.user.id);
    
    if (!salonOwner) {
      return res.status(404).json({ message: "Salon owner not found" });
    }

    const isMatch = await bcrypt.compare(currentPassword, salonOwner.password);
    res.json({ verified: isMatch });
  } catch (err) {
    console.error("Error in verifyPassword:", err);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  getSalonOwnerProfile,
  updateSalonOwnerProfile,
  verifyPassword
};

