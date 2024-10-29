import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

function DatePicker() {
  const location = useLocation();
  const { selectedServices = [], salonId } = location.state || {};
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState(null);

  // Calculate total price
  const calculateTotal = () => {
    return selectedServices.reduce((total, service) => total + service.price, 0).toFixed(2);
  };

  // Available time slots
  const timeSlots = [
    "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
    "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
    "15:00", "15:30", "16:00", "16:30", "17:00", "17:30"
  ];

  // Get today's date in YYYY-MM-DD format for min attribute
  const today = new Date().toISOString().split('T')[0];

  // Handle time selection
  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Link to={`/AllServices/${salonId}`}>
        <button
          type="button"
          className="bg-white text-center w-48 rounded-2xl h-14 relative font-sans text-black text-xl font-semibold group m-4"
        >
          <div className="bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 rounded-xl h-12 w-1/4 flex items-center justify-center absolute left-1 top-[4px] group-hover:w-[184px] z-10 duration-500">
            <svg
              width="25px"
              height="25px"
              viewBox="0 0 1024 1024"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="#000000"
                d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"
              ></path>
              <path
                fill="#000000"
                d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"
              ></path>
            </svg>
          </div>
          <p className="translate-x-2">Go Back</p>
        </button>
      </Link>

      <div className="flex justify-between p-8">
        {/* Calendar Section */}
        <div className="w-2/3 bg-white rounded-lg shadow-lg p-6 mr-8">
          <h2 className="text-xl font-bold mb-4">Select Date & Time</h2>
          
          {/* Date Input */}
          <div className="mb-8">
            <input
              type="date"
              min={today}
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-200 focus:border-red-200 outline-none"
            />
          </div>

          {/* Time Slots */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4">Available Time Slots</h3>
            <div className="grid grid-cols-4 gap-3">
              {timeSlots.map((time) => (
                <button
                  key={time}
                  onClick={() => handleTimeSelect(time)}
                  className={`p-2 rounded-lg transition-colors duration-200 ${
                    selectedTime === time
                      ? 'bg-red-200 text-gray-900'
                      : 'bg-gray-100 hover:bg-red-100'
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Services Card */}
        <div className="w-1/3">
          <div className="bg-white rounded-lg shadow-lg p-6 sticky top-4">
            <h2 className="font-bold text-xl mb-4">Booking Summary</h2>
            
            {/* Selected Date and Time */}
            {selectedDate && (
              <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                <p className="font-semibold">Selected Date:</p>
                <p>{new Date(selectedDate).toLocaleDateString('en-US', { 
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</p>
                {selectedTime && (
                  <>
                    <p className="font-semibold mt-2">Selected Time:</p>
                    <p>{selectedTime}</p>
                  </>
                )}
              </div>
            )}
            
            {/* Selected Services */}
            <div className="border-t pt-4">
              <p className="font-semibold mb-2">Selected Services:</p>
              {selectedServices.map((service, index) => (
                <div key={index} className="flex justify-between py-2 border-b">
                  <p>{service.name}</p>
                  <p>JOD {service.price}</p>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t">
              <div className="flex justify-between font-bold">
                <p>Total:</p>
                <p>JOD {calculateTotal()}</p>
              </div>
            </div>

            <Link 
              to="/Payment"
              state={{ 
                selectedServices, 
                selectedDate,
                selectedTime,
                salonId 
              }}
            >
              <button
                type="button"
                className="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center w-full mt-4"
                disabled={!selectedDate || !selectedTime}
              >
                Continue to Payment
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DatePicker;
