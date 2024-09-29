const User = require("../models/User");

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    console.log("req.body", req.body);

    // Check if the user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create a new user
    const newUser = new User({ username, email, password });

    // Save the user to the database
    await newUser.save();

    // Respond with success message
    res.status(201).json({
      message: "User registered successfully",
      role: newUser.role,
    });
  } catch (error) {
    // Log the full error details
    console.error("Error details:", error);

    // Respond with a detailed error message
    res.status(500).json({
      message: "Error registering user",
      error: error.message || "Unknown error",
    });
  }
};
