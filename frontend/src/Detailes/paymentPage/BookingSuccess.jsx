import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

function BookingSuccess() {
  const location = useLocation();
  const { bookingId, appointmentDate, appointmentTime } = location.state || {};

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="max-w-lg w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="flex justify-center mb-6">
          <CheckCircle className="w-20 h-20 text-green-500" />
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Booking Confirmed!
        </h1>
        
        <p className="text-gray-600 mb-6">
          Thank you for your booking. Your appointment has been successfully scheduled.
        </p>

        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <div className="mb-4">
            <p className="text-sm text-gray-600">Booking Reference:</p>
            <p className="font-medium">{bookingId}</p>
          </div>
          <div className="mb-4">
            <p className="text-sm text-gray-600">Appointment Date:</p>
            <p className="font-medium">
              {new Date(appointmentDate).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Appointment Time:</p>
            <p className="font-medium">{appointmentTime}</p>
          </div>
        </div>

        <div className="space-y-4">
          <Link to="/">
            <button className="w-full bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 text-gray-900 rounded-lg px-4 py-2 font-medium hover:bg-gradient-to-bl transition-colors">
              Return to Home
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default BookingSuccess; 