import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

function DatePicker() {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedServices = [], salonId } = location.state || {};
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState(null);
  const [error, setError] = useState("");

  const calculateTotal = () => {
    return selectedServices
      .reduce((total, service) => total + service.price, 0)
      .toFixed(2);
  };

  const timeSlots = [
    "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
    "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
    "15:00", "15:30", "16:00", "16:30", "17:00", "17:30",
  ];

  const today = new Date().toISOString().split("T")[0];

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
    setError("");
  };

  const handleContinueToPayment = () => {
    if (!selectedDate || !selectedTime) {
      setError("Please select both date and time");
      return;
    }

    navigate("/Payment", {
      state: {
        selectedServices,
        selectedDate,
        selectedTime,
        salonId,
        total: calculateTotal(),
      },
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Button */}
      <div className="container mx-auto px-4 py-4">
        <Link to={`/AllServices/${salonId}`}>
          <button className="inline-flex items-center px-4 py-2 text-sm sm:text-base font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-2 focus:ring-red-200">
            <svg
              className="w-5 h-5 mr-2"
              viewBox="0 0 1024 1024"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="currentColor"
                d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"
              />
              <path
                fill="currentColor"
                d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"
              />
            </svg>
            Go Back
          </button>
        </Link>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-6 max-w-7xl mx-auto">
          {/* Calendar Section */}
          <div className="w-full lg:w-2/3 bg-white rounded-lg shadow-lg p-4 sm:p-6 lg:p-8">
            <h2 className="text-xl sm:text-2xl font-bold mb-6">Select Date & Time</h2>

            {/* Date Input */}
            <div className="mb-8">
              <input
                type="date"
                min={today}
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full p-3 sm:p-4 border rounded-lg focus:ring-2 focus:ring-red-200 focus:border-red-200 outline-none"
              />
            </div>

            {/* Time Slots */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-4">Available Time Slots</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3">
                {timeSlots.map((time) => (
                  <button
                    key={time}
                    onClick={() => handleTimeSelect(time)}
                    className={`p-2 sm:p-3 rounded-lg transition-colors duration-200 text-sm sm:text-base
                      ${selectedTime === time
                        ? "bg-red-200 text-gray-900"
                        : "bg-gray-100 hover:bg-red-100"
                      }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Booking Summary */}
          <div className="w-full lg:w-1/3">
            <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 lg:p-8 sticky top-4">
              <h2 className="text-xl sm:text-2xl font-bold mb-6">Booking Summary</h2>

              {/* Selected Date and Time */}
              {selectedDate && (
                <div className="mb-6 p-3 sm:p-4 bg-gray-50 rounded-lg">
                  <p className="font-semibold mb-2">Selected Date:</p>
                  <p className="text-sm sm:text-base">
                    {new Date(selectedDate).toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                  {selectedTime && (
                    <>
                      <p className="font-semibold mt-4 mb-2">Selected Time:</p>
                      <p className="text-sm sm:text-base">{selectedTime}</p>
                    </>
                  )}
                </div>
              )}

              {/* Selected Services */}
              <div className="border-t pt-4">
                <p className="font-semibold mb-4">Selected Services:</p>
                <div className="space-y-3">
                  {selectedServices.map((service, index) => (
                    <div key={index} className="flex justify-between py-2 border-b">
                      <p className="text-sm sm:text-base">{service.name}</p>
                      <p className="text-sm sm:text-base font-medium">JOD {service.price}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Total */}
              <div className="mt-6 pt-4 border-t">
                <div className="flex justify-between items-center mb-6">
                  <p className="text-lg sm:text-xl font-bold">Total:</p>
                  <p className="text-lg sm:text-xl font-bold">JOD {calculateTotal()}</p>
                </div>

                <button
                  onClick={handleContinueToPayment}
                  className="w-full py-3 px-4 text-sm sm:text-base font-medium text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 rounded-lg transition-colors"
                  disabled={!selectedDate || !selectedTime}
                >
                  Continue to Payment
                </button>
              </div>
            </div>
          </div>
        </div>

        {error && (
          <div className="text-red-500 text-center mt-4 text-sm sm:text-base">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}

export default DatePicker;
