const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

// Import routes
const salonOwnerRegisterRoutes = require("./routes/routerSalonOwnerRegister");
const customerRegisterRoutes = require("./routes/routesCustomerRegister");
const salonDetailsRouter = require("./routes/salonDetailsRouter");
const imageInSalonPage = require("./routes/detailsProfileSalon/image");
const contactRoutes = require("./routes/contactRoutes");
const salonRoutes = require("./routes/salonRoutes");
const auth = require("./middleware/auth");

// Import database connection function
const connectDB = require("./config/db");

// Initialize Express app
const app = express();

// Use CORS middleware with configuration
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
  })
);

// Middleware
app.use(express.json());
app.use(bodyParser.json());

// Static files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Connect to Database
connectDB();

// Routes
app.use("/api/salonOwner", salonOwnerRegisterRoutes);
app.use("/api/user", customerRegisterRoutes);
app.use("/api/salon-ownerDahboord", salonDetailsRouter);
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api", require("./routes/home/section1"));
app.use("/api", imageInSalonPage);
app.use("/api/bookings", require("./routes/bookingRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/contact", contactRoutes);
app.use("/api", salonRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Something went wrong!",
    error: err.message,
  });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
