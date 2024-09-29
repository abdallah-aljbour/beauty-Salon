const express = require("express");
const router = express.Router();
const salonOwnerController = require("../controllers/registerSalonOwner");

router.post("/register", salonOwnerController.register);

module.exports = router;
