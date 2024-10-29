import React, { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

function Servies({ services = [], salonName, rating, closingTime, location }) {
  const [selectedServices, setSelectedServices] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  // Function to handle adding a service to the selected list
  const handleChooseService = (service) => {
    setSelectedServices((prevServices) => {
      const exists = prevServices.find(s => s._id === service._id);
      if (exists) {
        return prevServices.filter(s => s._id !== service._id);
      }
      return [...prevServices, service];
    });
  };

  // Calculate the total price of selected services
  const totalPrice = selectedServices.reduce(
    (total, service) => total + service.price,
    0
  );

  // Handle Book Now click
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
    <>
      <h1 className="m-8 font-bold text-2xl">Services</h1>
      <div className="m-8 grid grid-cols-3 gap-5">
        {services.map((service, index) => (
          <div key={index} className="border p-2 col-span-2">
            <p>{service.name}</p>
            <span className="opacity-30">45 mins</span>
            <br />
            <p>JOD {service.price}</p>
            <button
              onClick={() => handleChooseService(service)}
              className={`mt-4 ${
                selectedServices.find(s => s._id === service._id)
                  ? "text-red-500"
                  : "text-green-500"
              }`}
            >
              {selectedServices.find(s => s._id === service._id) 
                ? "Remove" 
                : "Choose"}
            </button>
          </div>
        ))}

        {/* Sidebar Information */}
        <div className="row-start-1 row-end-4 col-start-3 col-end-4 border sticky top-0 z-50">
          <p className="font-bold text-4xl p-5">{salonName || "Salon Name"}</p>
          <p className="font-bold p-5">Rating: {rating || "N/A"}</p>
          <button
            onClick={handleBookNow}
            type="button"
            className="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center w-96 ml-5"
          >
            Book Now
          </button>
          <div className="border-t-2 mt-10 p-4">
            <p>
              <span className="text-green-600">Open</span> until{" "}
              {closingTime || "N/A"}
            </p>
            <p className="mt-4">
              {location || "Location not available"}
              <br />
              <span className="text-blue-500">Get directions</span>
            </p>
          </div>
          <div className="border-t-2 mt-10 p-4">
            <p className="font-bold text-xl">
              Total: JOD {totalPrice.toFixed(2)}
            </p>
          </div>
        </div>
      </div>

      <button
        onClick={handleBookNow}
        type="button"
        className="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center w-36 ml-8"
      >
        See All
      </button>
    </>
  );
}

export default Servies;
