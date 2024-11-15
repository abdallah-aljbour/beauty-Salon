import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const placeholderImage =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Crect width='200' height='200' fill='%23cccccc'/%3E%3Ctext x='50%25' y='50%25' font-size='18' text-anchor='middle' alignment-baseline='middle' font-family='Arial, sans-serif' fill='%23666666'%3ENo Image%3C/text%3E%3C/svg%3E";

function Section1() {
  const [salons, setSalons] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  
  // Adjust salons per page based on screen size
  const getSalonsPerPage = () => {
    if (window.innerWidth >= 1024) return 3; // Desktop
    if (window.innerWidth >= 768) return 2;  // Tablet
    return 1; // Mobile
  };
  
  const [salonsPerPage, setSalonsPerPage] = useState(getSalonsPerPage());

  // Update salonsPerPage when window resizes
  useEffect(() => {
    const handleResize = () => {
      setSalonsPerPage(getSalonsPerPage());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchSalons = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "http://localhost:3000/api/recommended-salons"
        );
        if (Array.isArray(response.data)) {
          setSalons(response.data);
        } else {
          throw new Error("Invalid data format received");
        }
        setError(null);
      } catch (error) {
        console.error("Error fetching salons:", error);
        setError(
          error.response?.data?.message ||
            "Failed to fetch salons. Please try again later."
        );
      } finally {
        setLoading(false);
      }
    };
    fetchSalons();
  }, []);

  const indexOfLastSalon = currentPage * salonsPerPage;
  const indexOfFirstSalon = indexOfLastSalon - salonsPerPage;
  const currentSalons = salons.slice(indexOfFirstSalon, indexOfLastSalon);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const getImageUrl = (imagePath) => {
    if (!imagePath) return placeholderImage;
    const formattedPath = imagePath.startsWith("/uploads/")
      ? imagePath
      : `/uploads/${imagePath}`;
    return `http://localhost:3000${formattedPath}`;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-300"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center p-4">Error: {error}</div>;
  }

  if (!salons.length) {
    return (
      <div className="text-gray-500 text-center p-4">
        No salons available at the moment.
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-xl sm:text-2xl lg:text-3xl italic font-black my-6 sm:my-8 lg:my-10">
        Recommended
      </h1>
      
      {/* Responsive grid container */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
        {currentSalons.map((salon) => (
          <div
            key={salon.id}
            className="bg-white rounded-lg shadow-lg transition-transform duration-300 hover:scale-105"
          >
            <div className="relative overflow-hidden">
              <Link to={`/Detailes/Detailes/${salon.id}`}>
                <img
                  className="w-full h-48 sm:h-56 lg:h-64 object-cover rounded-t-lg"
                  src={getImageUrl(salon.image)}
                  alt={`${salon.salonName} image`}
                  loading="lazy"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = placeholderImage;
                  }}
                />
              </Link>
            </div>

            <div className="p-4 sm:p-5 lg:p-6">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                {salon.salonName}
              </h2>
              <div className="flex justify-between items-center">
                <p className="text-sm sm:text-base font-bold text-gray-900">
                  Rating: 4.5
                </p>
                <p className="text-sm sm:text-base text-gray-500">
                  {salon.city}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center space-x-2 my-6 sm:my-8 lg:my-10">
        {Array.from({ length: Math.ceil(salons.length / salonsPerPage) }).map(
          (_, index) => (
            <button
              key={index}
              onClick={() => paginate(index + 1)}
              className={`px-3 py-1 sm:px-4 sm:py-2 rounded-lg text-sm sm:text-base transition-colors duration-200 ${
                currentPage === index + 1
                  ? 'bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 text-gray-900'
                  : 'bg-gray-100 text-gray-600 hover:bg-red-100'
              }`}
            >
              {index + 1}
            </button>
          )
        )}
      </div>
    </div>
  );
}

export default Section1;
