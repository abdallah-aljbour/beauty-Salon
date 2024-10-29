import React from 'react';
import Navbar from '../Navbar';
import Footer from '../Footer';
import { Link } from 'react-router-dom';

function About() {
  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            About BeautySalon
          </h1>
          <p className="text-lg text-gray-700 mb-8">
            Your trusted destination for beauty and wellness services
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Our Mission
              </h2>
              <p className="text-gray-600 mb-6">
                At BeautySalon, we're dedicated to connecting people with the best beauty services in their area. Our platform makes it easy to discover, book, and enjoy professional beauty treatments from trusted salons.
              </p>
              <p className="text-gray-600">
                We believe that everyone deserves to feel beautiful and confident, and we're here to make that journey seamless and enjoyable.
              </p>
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="Beauty salon interior"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Why Choose Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="text-red-300 mb-4">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Easy Booking</h3>
              <p className="text-gray-600">
                Book your appointments with just a few clicks, anytime and anywhere.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="text-red-300 mb-4">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Verified Salons</h3>
              <p className="text-gray-600">
                All our partner salons are carefully vetted to ensure quality service.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="text-red-300 mb-4">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Instant Confirmation</h3>
              <p className="text-gray-600">
                Get immediate confirmation for your bookings with real-time updates.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Our Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((member) => (
              <div key={member} className="text-center">
                <div className="w-32 h-32 mx-auto rounded-full overflow-hidden mb-4">
                  <img
                    src={`https://i.pravatar.cc/150?img=${member}`}
                    alt={`Team member ${member}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-1">
                  Team Member {member}
                </h3>
                <p className="text-gray-600">Position</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">
            Get in Touch
          </h2>
          <p className="text-gray-600 mb-8">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
          <Link to="/contact">
            <button className="bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 text-gray-800 font-semibold py-3 px-8 rounded-lg hover:shadow-lg transition duration-300">
              Contact Us
            </button>
          </Link>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default About; 