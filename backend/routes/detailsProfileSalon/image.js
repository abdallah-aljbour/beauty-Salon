// routes/salonRoutes.js

const express = require("express");
const router = express.Router();
const salonController = require("../../controllers/detailsProfileSalon/image");

// Route to get a salon by ID
router.get("/salon/:id", salonController.getSalonById);

// Route to get recommended salons
router.get("/recommended-salons", salonController.getRecommendedSalons);

module.exports = router;
