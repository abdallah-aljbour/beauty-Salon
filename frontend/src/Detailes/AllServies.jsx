import React, { useState, useEffect } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import axios from "axios";
import Navbar from "../Navbar";

function AllServies() {
  const [services, setServices] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [salonDetails, setSalonDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const { salonId } = useParams();
  const location = useLocation();

  useEffect(() => {
    const fetchSalonDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/salons/${salonId}`);
        setServices(response.data.services);
        setSalonDetails({
          name: response.data.owner?.name || response.data.owner?.salonName || "Salon Name",
          city: response.data.city
        });

        // If we have previously selected services, load them
        if (location.state?.selectedServices) {
          setSelectedServices(location.state.selectedServices);
        }
      } catch (error) {
        console.error("Error fetching salon details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSalonDetails();
  }, [salonId, location.state]);

  const handleAddService = (service) => {
    setSelectedServices(prev => {
      const exists = prev.find(s => s._id === service._id);
      if (exists) {
        return prev.filter(s => s._id !== service._id);
      }
      return [...prev, service];
    });
  };

  const calculateTotal = () => {
    return selectedServices.reduce((total, service) => total + service.price, 0).toFixed(2);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <Navbar />
      <h1 className="text-4xl font-bold m-8">Select services </h1>
      <div className="flex">
        <p className="m-8 font-bold">Featured</p>
        <p className="m-8 font-bold">Nails</p>
        <p className="m-8 font-bold">Eyebrows & eyelashes</p>
        <p className="m-8 font-bold">Hair & styling</p>
        <p className="m-8 font-bold">Body care</p>
      </div>
      <div className="grid grid-cols-3 grid-rows gap-5 m-8">
        {/* Services List */}
        <div className="col-span-2">
          {services.map((service, index) => (
            <div key={index} className="relative">
              <p className="border p-2 row-start-1 row-end-2 col-start-1 col-end-3">
                {service.name}
                <br />
                <span className="opacity-30">45mins</span>
                <br /> <br />
                JOD {service.price}
              </p>
              <button
                onClick={() => handleAddService(service)}
                className="absolute right-4 top-1/2 -translate-y-1/2 group cursor-pointer outline-none hover:rotate-90 duration-300"
                title={selectedServices.find(s => s._id === service._id) ? "Remove" : "Add"}
              >
                <svg
                  className="stroke-current fill-none group-hover:stroke-yellow-200 group-active:stroke-yellow-500 transition-colors duration-300"
                  viewBox="0 0 24 24"
                  height="40px"
                  width="40px"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeWidth="1.5"
                    d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
                    className="stroke-red-200 group-hover:stroke-red-300 group-active:stroke-yellow-200"
                  />
                  <path
                    strokeWidth="1.5"
                    d="M8 12H16"
                    className="stroke-red-200 group-hover:stroke-red-300 group-active:stroke-yellow-200"
                  />
                  {!selectedServices.find(s => s._id === service._id) && (
                    <path
                      strokeWidth="1.5"
                      d="M12 16V8"
                      className="stroke-red-200 group-hover:stroke-red-300 group-active:stroke-yellow-200"
                    />
                  )}
                </svg>
              </button>
            </div>
          ))}
        </div>

        {/* Sidebar */}
        <div className="row-start-1 row-end-4 col-start-3 col-end-4 border sticky top-0 z-50">
          <p className="font-bold text-4xl p-5">{salonDetails.name}</p>
          
          {selectedServices.map((service, index) => (
            <div key={index} className="flex justify-between">
              <p className="p-5">{service.name}</p>
              <p className="p-5">JOD {service.price}</p>
            </div>
          ))}

          <div className="border-t-2 mt-10">
            <div className="p-5">
              <p className="font-bold">Total: JOD {calculateTotal()}</p>
            </div>
            <Link 
              to="/DatePicker"
              state={{ selectedServices, salonId }}
            >
              <button
                type="button"
                className="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 w-96 ml-9 mt-32"
                disabled={selectedServices.length === 0}
              >
                Continue
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default AllServies;
