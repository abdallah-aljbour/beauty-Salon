const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

// POST route for contact form
router.post('/', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Validate input
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: 'Please fill in all fields' });
    }

    // Create new contact message
    const contact = new Contact({
      name,
      email,
      subject,
      message
    });

    await contact.save();
    res.status(201).json({ success: true, message: 'Message sent successfully' });
  } catch (err) {
    console.error('Error in contact route:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// GET route for admin to view messages
router.get('/', async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    console.error('Error fetching contact messages:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 