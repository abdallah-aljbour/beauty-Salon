import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function Image() {
  const [salon, setSalon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchSalonData = async () => {
      console.log("Current ID from params:", id);

      if (!id) {
        console.log("No salon ID available");
        setError("No salon ID provided");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        console.log("Fetching salon data for ID:", id);
        const response = await axios.get(
          `http://localhost:3000/api/salons/${id}`
        );
        console.log("Received salon data:", response.data);
        setSalon(response.data);
        setError(null);
      } catch (error) {
        console.error("Error fetching salon data:", error);
        setError(`Failed to fetch salon data: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchSalonData();
  }, [id]);

  if (loading) return <div>Loading salon data...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!salon) return <div>No salon data available.</div>;

  // Get the main image URL
  const mainImageUrl = salon.image 
    ? `http://localhost:3000${salon.image}`
    : "https://via.placeholder.com/400x300?text=No+Image";

  // Get additional images if they exist
  const additionalUrls = salon.images 
    ? salon.images.map(img => `http://localhost:3000${img}`)
    : [];

  // Combine main image with additional images and take first 3
  const allImageUrls = [mainImageUrl, ...additionalUrls].slice(0, 3);

  // Fill remaining slots with placeholders if needed
  while (allImageUrls.length < 3) {
    allImageUrls.push("https://via.placeholder.com/400x300?text=No+Image");
  }

  return (
    <div className="salon-details">
      {/* <h1>{salon.salonName || 'Salon Details'}</h1> */}
      
      <div className="images-container">
        {allImageUrls.map((url, index) => (
          <div key={index} className="image-wrapper">
            <img
              src={url}
              alt={`Salon view ${index + 1}`}
              onError={(e) => {
                console.log("Image load error for URL:", url);
                e.target.onerror = null;
                e.target.src = "https://via.placeholder.com/400x300?text=No+Image";
              }}
            />
          </div>
        ))}
      </div>

      {/* <div className="salon-info">
        <p>Owner: {salon.owner?.name || "N/A"}</p>
        <p>City: {salon.city || "N/A"}</p>
        <p>Bio: {salon.bio || "No bio available"}</p>
      </div> */}

      <style jsx>{`
        .salon-details {
          padding: 20px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .images-container {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          margin: 20px 0;
        }

        .image-wrapper {
          aspect-ratio: 4/3;
          overflow: hidden;
          border-radius: 8px;
          border: 1px solid #ddd;
        }

        .image-wrapper img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .salon-info {
          margin-top: 20px;
          padding: 20px;
          background: #f5f5f5;
          border-radius: 8px;
        }
      `}</style>
    </div>
  );
}

export default Image;