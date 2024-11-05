import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const placeholderImage =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Crect width='200' height='200' fill='%23cccccc'/%3E%3Ctext x='50%25' y='50%25' font-size='18' text-anchor='middle' alignment-baseline='middle' font-family='Arial, sans-serif' fill='%23666666'%3ENo Image%3C/text%3E%3C/svg%3E";

function Section1() {
  const [salons, setSalons] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSalons = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "http://localhost:3000/api/recommended-salons"
        );
        
        console.log('Fetched salons:', response.data); // Debug log
        
        if (Array.isArray(response.data)) {
          setSalons(response.data);
        } else {
          throw new Error('Invalid data format received');
        }

        setError(null);
      } catch (error) {
        console.error("Error fetching salons:", error);
        setError(error.response?.data?.message || "Failed to fetch salons. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchSalons();
  }, []);

  const getImageUrl = (imagePath) => {
    if (!imagePath) return placeholderImage;
    
    // Ensure the image path starts with /uploads/
    const formattedPath = imagePath.startsWith('/uploads/') 
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
    return (
      <div className="text-red-500 text-center p-4">
        Error: {error}
      </div>
    );
  }

  if (!salons.length) {
    return (
      <div className="text-gray-500 text-center p-4">
        No salons available at the moment.
      </div>
    );
  }

  return (
    <>
      <h1 className="bg-white m-10 italic font-black">Recommended</h1>
      <div className="flex m-10 justify-between flex-wrap">
        {salons.map((salon) => (
          <div
            key={salon.id}
            className="block max-w-[18rem] rounded-lg bg-white text-surface shadow-secondary-1 dark:bg-surface-dark dark:text-black mb-4"
          >
            <div className="relative overflow-hidden bg-cover bg-no-repeat">
              <Link to={`/Detailes/Detailes/${salon.id}`}>
                <img
                  className="rounded-t-lg w-full h-48 object-cover"
                  src={getImageUrl(salon.image)}
                  alt={`${salon.salonName} image`}
                  loading="lazy"
                  onError={(e) => {
                    console.error(`Failed to load image: ${e.target.src}`);
                    e.target.onerror = null;
                    e.target.src = placeholderImage;
                  }}
                />
              </Link>
            </div>

            <div className="p-6 border shadow-lg">
              <p className="text-black font-bold">{salon.salonName}</p>
              <p className="text-black font-bold">Rating : 4.5</p>
              <p className="text-black opacity-35">{salon.city}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Section1;
