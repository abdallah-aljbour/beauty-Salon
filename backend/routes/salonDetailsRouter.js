const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const multer = require("multer");
const path = require("path");

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Import all controllers
const {
  createSalonDetails,
  getSalonServices,
  addServiceToSalon,
  updateSalonService,
  deleteSalonService,
} = require("../controllers/adminSalon/salonDetailesController");

const {
  getOpeningHours,
  updateOpeningHours,
} = require("../controllers/adminSalon/openTimeController");

const {
  getSalonOwnerProfile,
  updateSalonOwnerProfile,
  verifyPassword
} = require("../controllers/adminSalon/profileController");

// Profile routes
router.get("/profile", auth, getSalonOwnerProfile);
router.put("/profile", auth, updateSalonOwnerProfile);
router.post("/verify-password", auth, verifyPassword);

// Create salon profile route - handle multiple images
router.post("/", auth, upload.array('images', 3), createSalonDetails);

// Services routes
router.get("/services", auth, getSalonServices);
router.post("/services", auth, addServiceToSalon);
router.put("/services/:serviceId", auth, updateSalonService);
router.delete("/services/:serviceId", auth, deleteSalonService);

// Opening hours routes
router.get("/opening-hours", auth, getOpeningHours);
router.put("/opening-hours", auth, updateOpeningHours);

// Add this before module.exports
router.use((err, req, res, next) => {
  console.error("Router Error:", err);
  res.status(500).json({
    message: "An error occurred",
    error: err.message
  });
});

module.exports = router;
