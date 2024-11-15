import React, { useState, useEffect } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import axios from "axios";
import Navbar from "../Navbar";

function AllServies() {
  const [services, setServices] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [salonDetails, setSalonDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('Featured');
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

  const categories = ['Featured', 'Nails', 'Eyebrows & eyelashes', 'Hair & styling', 'Body care'];

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-300"></div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold my-4 sm:my-6 lg:my-8">
          Select services
        </h1>

        {/* Categories - Horizontal scroll on mobile */}
        <div className="overflow-x-auto -mx-4 sm:mx-0 mb-6">
          <div className="flex space-x-4 px-4 sm:px-0 min-w-max sm:min-w-0">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`whitespace-nowrap px-4 py-2 rounded-lg text-sm sm:text-base font-medium transition-colors
                  ${activeCategory === category 
                    ? 'bg-red-200 text-gray-900' 
                    : 'text-gray-600 hover:bg-red-100'}`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Services List */}
          <div className="lg:col-span-2 space-y-4">
            {services.map((service) => (
              <div 
                key={service._id} 
                className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 sm:p-6 relative"
              >
                <div className="pr-12">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                    {service.name}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">45mins</p>
                  <p className="text-base sm:text-lg font-medium text-gray-900 mt-2">
                    JOD {service.price}
                  </p>
                </div>
                <button
                  onClick={() => handleAddService(service)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 group cursor-pointer outline-none hover:rotate-90 duration-300"
                  title={selectedServices.find(s => s._id === service._id) ? "Remove" : "Add"}
                >
                  <svg
                    className="w-8 h-8 sm:w-10 sm:h-10"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeWidth="1.5"
                      d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
                      className="stroke-red-200 group-hover:stroke-red-300"
                    />
                    <path
                      strokeWidth="1.5"
                      d="M8 12H16"
                      className="stroke-red-200 group-hover:stroke-red-300"
                    />
                    {!selectedServices.find(s => s._id === service._id) && (
                      <path
                        strokeWidth="1.5"
                        d="M12 16V8"
                        className="stroke-red-200 group-hover:stroke-red-300"
                      />
                    )}
                  </svg>
                </button>
              </div>
            ))}
          </div>

          {/* Sidebar/Bottom Cart */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg border border-gray-100 p-4 sm:p-6 lg:sticky lg:top-20">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
                {salonDetails.name}
              </h2>
              
              <div className="space-y-3">
                {selectedServices.map((service) => (
                  <div key={service._id} className="flex justify-between items-center">
                    <p className="text-sm sm:text-base text-gray-700">{service.name}</p>
                    <p className="text-sm sm:text-base font-medium">JOD {service.price}</p>
                  </div>
                ))}
              </div>

              {selectedServices.length > 0 && (
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <div className="flex justify-between items-center mb-6">
                    <p className="text-base sm:text-lg font-bold text-gray-900">Total:</p>
                    <p className="text-base sm:text-lg font-bold text-gray-900">
                      JOD {calculateTotal()}
                    </p>
                  </div>
                  
                  <Link 
                    to="/DatePicker"
                    state={{ selectedServices, salonId }}
                  >
                    <button
                      type="button"
                      className="w-full py-3 px-4 text-sm sm:text-base font-medium text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 rounded-lg transition-colors"
                    >
                      Continue
                    </button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AllServies;
