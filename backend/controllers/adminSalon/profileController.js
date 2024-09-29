const SalonOwner = require("../../models/SalonOwner");
const bcrypt = require("bcrypt");

const getSalonOwnerProfile = async (req, res) => {
  try {
    const salonOwner = await SalonOwner.findById(req.user.id).select(
      "-password"
    );
    if (!salonOwner) {
      return res.status(404).json({ msg: "Salon owner not found" });
    }
    res.json(salonOwner);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

const updateSalonOwnerProfile = async (req, res) => {
  const { username, salonName, currentPassword, newPassword } = req.body;
  console.log("New password:", newPassword);
  console.log("Request body:", req.body);

  try {
    const salonOwner = await SalonOwner.findById(req.user.id);
    if (!salonOwner) {
      return res.status(404).json({ msg: "Salon owner not found" });
    }

    if (username) salonOwner.username = username;
    if (salonName) salonOwner.salonName = salonName;

    if (currentPassword && newPassword) {
      const isMatch = await bcrypt.compare(
        currentPassword,
        salonOwner.password
      );
      if (!isMatch) {
        return res.status(400).json({ msg: "Current password is incorrect" });
      }
      // No need to hash the new password, since it will be hashed in the model
      salonOwner.password = newPassword; // Assign the new password directly
    }

    await salonOwner.save();
    const updatedOwner = await SalonOwner.findById(req.user.id).select(
      "-password"
    );
    res.json(updatedOwner);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

const verifyPassword = async (req, res) => {
  const { currentPassword } = req.body;
  console.log("currentPassword", currentPassword);
  try {
    const salonOwner = await SalonOwner.findById(req.user.id);
    if (!salonOwner) {
      return res.status(404).json({ msg: "Salon owner not found" });
    }
    const isMatch = await bcrypt.compare(currentPassword, salonOwner.password);
    res.json({ verified: isMatch });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

module.exports = {
  getSalonOwnerProfile,
  updateSalonOwnerProfile,
  verifyPassword,
};
