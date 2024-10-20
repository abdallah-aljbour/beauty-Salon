const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
//service admain logic
const {
  createProfile,
  getServices,
  updateService,
  deleteService,
  addService,
} = require("../controllers/adminSalon/salonDetailesController");

//profile admin logic
const {
  getSalonOwnerProfile,
  updateSalonOwnerProfile,
  verifyPassword,
} = require("../controllers/adminSalon/profileController");

const {
  getOpeningHours,
  updateOpeningHours,
} = require("../controllers/adminSalon/openTimeController");

// Define the uploads directory
const uploadsDir = path.join(__dirname, "../uploads");

// Check if uploads directory exists; if not, create it
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
  console.log("Uploads directory created at:", uploadsDir);
} else {
  console.log("Uploads directory already exists at:", uploadsDir);
}

// Set up multer for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

// Check file type
function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error("Error: Images Only!"));
  }
}

// Middleware to handle multer errors
const handleMulterError = (error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === "LIMIT_FILE_SIZE") {
      return res
        .status(400)
        .json({ error: "File size is too large. Max limit is 5MB" });
    }
  }
  if (error.message === "Error: Images Only!") {
    return res.status(400).json({ error: "Only image files are allowed" });
  }
  next(error);
};

// Create or update salon profile
router.post(
  "/createService",
  auth,
  upload.array("images", 3),
  handleMulterError,
  createProfile
);

// Get services profile
router.get("/get", auth, getServices);
router.put("/update/:index", auth, updateService);
router.delete("/delete/:index", auth, deleteService);
router.post("/Addservices", auth, addService);

//profile admin Routes
router.get("/profile", auth, getSalonOwnerProfile);
router.put("/profile", auth, updateSalonOwnerProfile);
router.post("/verify-password", auth, verifyPassword);

//opening Time Houre

router.get("/opening-hours", auth, getOpeningHours);
router.put("/opening-hours", auth, updateOpeningHours);

module.exports = router;
