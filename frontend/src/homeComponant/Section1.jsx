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

  if (loading) return <div>Loading salons...</div>;
  if (error) return <div>Error: {error}</div>;

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
              <Link to={`/salon-profile/${salon.id}`}>
                <img
                  className="rounded-t-lg w-full h-48 object-cover"
                  src={
                    salon.image
                      ? `http://localhost:3000${salon.image}`
                      : placeholderImage
                  }
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
