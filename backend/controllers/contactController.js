const Contact = require('../models/Contact');

exports.submitContactForm = async (req, res) => {
  try {
    console.log('Received contact form data:', req.body);
    
    const { name, email, subject, message } = req.body;
    const userId = req.user ? req.user.id : null;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }

    const contact = new Contact({
      userId,
      name,
      email,
      subject,
      message
    });

    await contact.save();
    console.log('Contact saved successfully:', contact);

    res.status(201).json({
      success: true,
      message: 'Message sent successfully'
    });
  } catch (error) {
    console.error('Error submitting contact form:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send message',
      error: error.message
    });
  }
}; 