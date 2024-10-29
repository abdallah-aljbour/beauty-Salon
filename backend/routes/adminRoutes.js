const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

// Your routes here
router.get('/profile', auth, async (req, res) => {
  // ... route handler code
});

module.exports = router; 