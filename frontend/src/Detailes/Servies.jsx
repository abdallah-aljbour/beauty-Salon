import React from "react";
import { Link } from "react-router-dom";

function Servies({ services = [], salonName, rating, closingTime, location }) {
  return (
    <>
      <h1 className="m-8 font-bold text-2xl">Services</h1>
      <div className="m-8 grid grid-cols-3 gap-5">
        {services.map((service, index) => (
          <div key={index} className="border p-2 col-span-2">
            <p>{service.name}</p>
            <span className="opacity-30">45 mins</span>{" "}
            {/* Replace if actual time is available */}
            <br />
            <p>JOD {service.price}</p>
            <Link className="mt-4 inline-block" to="/Detailes/AllServices">
              <button>Book</button>
            </Link>
          </div>
        ))}

        {/* Sidebar Information */}
        <div className="row-start-1 row-end-4 col-start-3 col-end-4 border sticky top-0 z-50">
          <p className="font-bold text-4xl p-5">
            {salonName || "Salon Name"}
          </p>
          <p className="font-bold p-5">Rating: {rating || "N/A"}</p>
          <Link to="/Detailes/AllServices">
            <button
              type="button"
              className="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center w-96 ml-5"
            >
              Book Now
            </button>
          </Link>
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
        </div>
      </div>

      <Link to="/Detailes/AllServices">
        <button
          type="button"
          className="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center w-36 ml-8"
        >
          See All
        </button>
      </Link>
    </>
  );
}

export default Servies;
