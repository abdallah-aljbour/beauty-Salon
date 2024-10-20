const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");
const salonOwnerRegisterRoutes = require("./routes/routerSalonOwnerRegister");
const customerRegisterRoutes = require("./routes/routesCustomerRegister");
const salonDetaielsRoutes = require("./routes/salonDetaielsRouter");
const imageInSalonPage = require("./routes/detailsProfileSalon/image");
const path = require("path");

// Import database connection function
const connectDB = require("./config/db");

// Initialize Express app
const app = express();

// Use CORS middleware with configuration
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"], // Allow both origins
    credentials: true,
  })
);
// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(bodyParser.json());

// Log the absolute path to the uploads directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

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

//login
app.use("/api/auth", require("./routes/authRoutes"));

//home page section 1
app.use("/api", require("./routes/home/section1"));

//detailes page for salon profile 
app.use("/api", imageInSalonPage);


// Set up server to listen on a specified port
const PORT = process.env.PORT || 3000; // Use PORT from environment variables or default to 3000
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`); // Log server start message
});
