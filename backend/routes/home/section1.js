const express = require("express");
const router = express.Router();
const salonController = require("../../controllers/homePage/sections1");

// Route for fetching recommended salons
router.get("/recommended-salons", salonController.getRecommendedSalons);

// Route for fetching a single salon by its ID
router.get("/salons/:id", salonController.getSalonById);

module.exports = router;
