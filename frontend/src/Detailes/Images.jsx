import React from "react";

const placeholderImage = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Crect width='200' height='200' fill='%23cccccc'/%3E%3Ctext x='50%25' y='50%25' font-size='18' text-anchor='middle' alignment-baseline='middle' font-family='Arial, sans-serif' fill='%23666666'%3ENo Image%3C/text%3E%3C/svg%3E";

function Image({ images = [] }) {
  const getImageUrl = (imagePath) => {
    if (!imagePath) return placeholderImage;
    
    // Ensure the image path starts with /uploads/
    const formattedPath = imagePath.startsWith('/uploads/') 
      ? imagePath 
      : `/uploads/${imagePath}`;
      
    return `http://localhost:3000${formattedPath}`;
  };

  return (
    <div className="grid grid-cols-3 gap-4 m-8">
      {images.map((image, index) => (
        <img
          key={index}
          src={getImageUrl(image)}
          alt={`Salon image ${index + 1}`}
          className="w-full h-64 object-cover rounded-lg"
          onError={(e) => {
            console.error(`Failed to load image: ${e.target.src}`);
            e.target.onerror = null;
            e.target.src = placeholderImage;
          }}
        />
      ))}
    </div>
  );
}

export default Image;