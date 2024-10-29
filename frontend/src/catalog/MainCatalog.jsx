import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "../Navbar";
import Footer from "../Footer";

function Catalog() {
  const [salons, setSalons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const placeholderImage = "https://placehold.co/600x400?text=Salon+Image";

  useEffect(() => {
    const fetchSalons = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:3000/api/salons");
        console.log('Fetched salons:', response.data); // For debugging
        setSalons(response.data);
        setError(null);
      } catch (error) {
        console.error("Error fetching salons:", error);
        setError("Failed to fetch salons. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchSalons();
  }, []);

  const handleImageError = (e) => {
    console.log('Image failed to load:', e.target.src);
    e.target.onerror = null; // Prevent infinite loop
    e.target.src = placeholderImage;
  };

  return (
    <>
      <Navbar />
      <div className="bg-gray-50 min-h-screen py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">All Salons</h1>
          
          {loading ? (
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-300"></div>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-500 text-lg">{error}</p>
              <button 
                onClick={() => window.location.reload()}
                className="mt-4 px-4 py-2 bg-red-400 text-white rounded-lg hover:bg-red-500 transition-colors"
              >
                Try Again
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {salons.map((salon) => (
                <Link 
                  to={`/Detailes/Detailes/${salon.id}`}
                  key={salon.id}
                  className="transform hover:scale-105 transition-transform duration-200"
                >
                  <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow">
                    <div className="relative h-48">
                      <img
                        className="w-full h-full object-cover"
                        src={salon.image ? `http://localhost:3000${salon.image}` : placeholderImage}
                        alt={salon.salonName}
                        onError={handleImageError}
                        loading="lazy"
                      />
                    </div>
                    <div className="p-4">
                      <h2 className="text-xl font-semibold text-gray-900 mb-2">
                        {salon.salonName}
                      </h2>
                      <div className="flex items-center justify-between">
                        <p className="text-gray-600">
                          {salon.city}
                        </p>
                        <div className="flex items-center">
                          <svg 
                            className="w-5 h-5 text-yellow-400" 
                            fill="currentColor" 
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <span className="ml-1 text-gray-600">4.5</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Catalog;
