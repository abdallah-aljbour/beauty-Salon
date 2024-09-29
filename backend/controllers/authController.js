const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const SalonOwner = require("../models/SalonOwner");

exports.login = async (req, res) => {
  const { email, password } = req.body;
  console.log("Received login request with:", req.body);

  // Check for required fields
  if (!email || !password) {
    console.log("Missing username or password");
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }

  try {
    // Attempt to find the user
    let user = await User.findOne({ email });
    let isOwner = false;

    if (!user) {
      user = await SalonOwner.findOne({ email });
      isOwner = true;
    }

    if (!user) {
      console.log("User not found");
      return res.status(400).json({ message: "Invalid credentials" });
    }

    console.log("User found:", user);

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("Password does not match");
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const payload = {
      user: {
        id: user.id,
        role: user.role,
        isOwner,
      },
    };

    // Sign the token
    const token = await jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    console.log("Token generated:", token);
    res.json({ token });
  } catch (err) {
    console.error("Error during login:", err.message);
    res.status(500).send("Server error");
  }
};
