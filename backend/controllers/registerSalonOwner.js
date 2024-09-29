const SalonOwner = require("../models/SalonOwner");

exports.register = async (req, res) => {
  try {
    const { username, email, password, salonName } = req.body;
    console.log("req.body", req.body);
    const existingOwner = await SalonOwner.findOne({ username });
    if (existingOwner) {
      return res.status(400).json({ message: "Owner already exists" });
    }

    const newOwner = new SalonOwner({ username, email, password, salonName });
    await newOwner.save();
    res.status(201).json({
      message: "Salon owner registered successfully",
      role: newOwner.role, // Send the role in response
    });
  } catch (error) {
    res.status(500).json({ message: "Error registering salon owner", error });
  }
};
