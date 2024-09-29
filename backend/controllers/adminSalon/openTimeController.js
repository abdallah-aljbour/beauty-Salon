const SalonProfile = require("../../models/SalonProfile");

exports.getOpeningHours = async (req, res) => {
  try {
    const ownerId = req.user.id;

    const salonProfile = await SalonProfile.findOne({ owner: ownerId });
    if (!salonProfile) {
      return res.status(404).json({ message: "Salon profile not found" });
    }

    res.json({ openingHours: salonProfile.openingHours });
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving opening hours",
      error: error.message,
    });
  }
};

exports.updateOpeningHours = async (req, res) => {
  try {
    const ownerId = req.user.id;
    const updatedOpeningHours = req.body.openingHours;
    console.log("updatedOpeningHours", updatedOpeningHours);

    const salonProfile = await SalonProfile.findOneAndUpdate(
      { owner: ownerId },
      { $set: { openingHours: updatedOpeningHours } },
      { new: true }
    );

    if (!salonProfile) {
      return res.status(404).json({ message: "Salon profile not found" });
    }

    res.json({
      message: "Opening hours updated successfully",
      openingHours: salonProfile.openingHours,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating opening hours", error: error.message });
  }
};
