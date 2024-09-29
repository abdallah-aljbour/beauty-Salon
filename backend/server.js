const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");
const salonOwnerRegisterRoutes = require("./routes/routerSalonOwnerRegister");
const customerRegisterRoutes = require("./routes/routesCustomerRegister");
const salonDetaielsRoutes = require("./routes/salonDetaielsRouter");

// Import database connection function
const connectDB = require("./config/db");

// Initialize Express app
const app = express();

// Use CORS middleware with configuration
app.use(
  cors({
    // origin: process.env.FRONTEND_URL,
    origin: true,
    credentials: true,
  })
);
// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(bodyParser.json());

// Connect to Database
connectDB(); // Connect to MongoDB

// Main route
app.get("/", (req, res) => {
  res.send("Recipe Hub!"); // Root route response
});

// Routes
app.use("/api/salonOwner", salonOwnerRegisterRoutes);
app.use("/api/user", customerRegisterRoutes);

//ownerDashboord
app.use("/api/salon-ownerDahboord", salonDetaielsRoutes);

app.use("/api/auth", require("./routes/authRoutes"));

// Set up server to listen on a specified port
const PORT = process.env.PORT || 3000; // Use PORT from environment variables or default to 3000
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`); // Log server start message
});
