import React, { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

function Servies({ services = [], salonName, rating, closingTime, location }) {
  const [selectedServices, setSelectedServices] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  const handleChooseService = (service) => {
    setSelectedServices((prevServices) => {
      const exists = prevServices.find(s => s._id === service._id);
      if (exists) {
        return prevServices.filter(s => s._id !== service._id);
      }
      return [...prevServices, service];
    });
  };

  const totalPrice = selectedServices.reduce(
    (total, service) => total + service.price,
    0
  );

  const handleBookNow = () => {
    navigate(`/AllServices/${id}`, {
      state: {
        selectedServices,
        totalPrice,
        salonName
      }
    });
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6">Services</h1>
      
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Services List */}
        <div className="w-full lg:w-2/3 space-y-4">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 sm:p-6 relative"
            >
              <div className="pr-16">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                  {service.name}
                </h3>
                <p className="text-sm text-gray-500 mt-1">45 mins</p>
                <p className="text-base sm:text-lg font-medium text-gray-900 mt-2">
                  JOD {service.price}
                </p>
              </div>
              <button
                onClick={() => handleChooseService(service)}
                className={`absolute right-4 top-1/2 -translate-y-1/2 px-4 py-2 rounded-lg text-sm transition-colors
                  ${selectedServices.find(s => s._id === service._id)
                    ? "bg-red-100 text-red-600"
                    : "bg-green-100 text-green-600"
                  }`}
              >
                {selectedServices.find(s => s._id === service._id) 
                  ? "Remove" 
                  : "Choose"}
              </button>
            </div>
          ))}
        </div>

        {/* Sidebar - Fixed on desktop, bottom sheet on mobile */}
        <div className="w-full lg:w-1/3">
          <div className="bg-white rounded-lg shadow-lg border border-gray-100 p-4 sm:p-6 lg:sticky lg:top-20">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
              {salonName || "Salon Name"}
            </h2>
            <p className="text-base sm:text-lg font-medium mb-4">
              Rating: {rating || "N/A"}
            </p>

            {/* Selected Services */}
            {selectedServices.length > 0 && (
              <div className="border-t border-gray-200 py-4 space-y-2">
                {selectedServices.map((service, index) => (
                  <div key={index} className="flex justify-between text-sm sm:text-base">
                    <span>{service.name}</span>
                    <span>JOD {service.price}</span>
                  </div>
                ))}
                <div className="pt-2 border-t mt-4">
                  <p className="text-lg sm:text-xl font-bold flex justify-between">
                    <span>Total:</span>
                    <span>JOD {totalPrice.toFixed(2)}</span>
                  </p>
                </div>
              </div>
            )}

            <button
              onClick={handleBookNow}
              className="w-full py-3 px-4 mt-4 text-sm sm:text-base font-medium text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 rounded-lg hover:opacity-90 transition-colors"
            >
              Book Now
            </button>

            {/* Additional Info */}
            <div className="mt-6 pt-4 border-t">
              <p className="flex items-center gap-2 text-sm sm:text-base">
                <span className="text-green-600">Open</span> until {closingTime || "N/A"}
              </p>
              <p className="mt-4 text-sm sm:text-base">
                {location || "Location not available"}
                <br />
                <span className="text-blue-500 cursor-pointer hover:text-blue-600">
                  Get directions
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Action */}
      <div className="fixed bottom-0 left-0 right-0 lg:hidden bg-white border-t p-4 shadow-lg">
        <button
          onClick={handleBookNow}
          className="w-full py-3 text-sm font-medium text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 rounded-lg hover:opacity-90 transition-colors"
        >
          See All Services
        </button>
      </div>
    </div>
  );
}

export default Servies;
