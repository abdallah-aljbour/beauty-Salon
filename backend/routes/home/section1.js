const express = require('express');
const router = express.Router();
const sectionController = require('../../controllers/homePage/sections1');

router.get('/recommended-salons', sectionController.getRecommendedSalons);
router.get('/popular-salons', sectionController.getPopularSalons);
router.get('/trending-salons', sectionController.getTrendingSalons);
router.get('/salons/:id', sectionController.getSalonById);

module.exports = router;
