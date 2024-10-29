import React, { useState } from 'react';
import Navbar from '../Navbar';
import Footer from '../Footer';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import axios from 'axios';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    
    try {
      console.log('Sending form data:', formData);
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` })
        }
      };

      const response = await axios.post(
        'http://localhost:3000/api/contact',
        formData,
        config
      );

      console.log('Response:', response.data);

      if (response.data.success) {
        setStatus('success');
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      } else {
        setStatus('error');
        console.error('Server returned error:', response.data);
      }
    } catch (error) {
      console.error('Contact form submission error:', error);
      setStatus('error');
      if (error.response) {
        console.error('Error response:', error.response.data);
      }
    }
  };

  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Contact Us
          </h1>
          <p className="text-lg text-gray-700">
            We'd love to hear from you. Get in touch with us.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-8">
              Get in Touch
            </h2>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <MapPin className="w-6 h-6 text-red-300 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-800">Our Location</h3>
                  <p className="text-gray-600 mt-1">
                    123 Beauty Street, Amman, Jordan
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Phone className="w-6 h-6 text-red-300 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-800">Phone</h3>
                  <p className="text-gray-600 mt-1">+962 78 856 5171</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Mail className="w-6 h-6 text-red-300 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-800">Email</h3>
                  <p className="text-gray-600 mt-1">info@beautysalon.com</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Clock className="w-6 h-6 text-red-300 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-800">Working Hours</h3>
                  <p className="text-gray-600 mt-1">
                    Monday - Saturday: 9:00 AM - 7:00 PM<br />
                    Sunday: Closed
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-red-300 focus:ring focus:ring-red-200 focus:ring-opacity-50"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-red-300 focus:ring focus:ring-red-200 focus:ring-opacity-50"
                  required
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-red-300 focus:ring focus:ring-red-200 focus:ring-opacity-50"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-red-300 focus:ring focus:ring-red-200 focus:ring-opacity-50"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 text-gray-800 font-semibold py-3 px-6 rounded-lg hover:shadow-lg transition duration-300"
              >
                {status === 'sending' ? 'Sending...' : 'Send Message'}
              </button>

              {status === 'success' && (
                <p className="text-green-600 text-center">Message sent successfully!</p>
              )}
              {status === 'error' && (
                <p className="text-red-600 text-center">Failed to send message. Please try again.</p>
              )}
            </form>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-12">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3471.528025898094!2d35.0037932246183!3d29.530113475186628!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x150070366ddcf20d%3A0x92f8776b678e59bd!2sAqaba%20Gateway!5e0!3m2!1sar!2sjo!4v1722096949650!5m2!1sar!2sjo"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Contact; 