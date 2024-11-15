import React from "react";

const placeholderImage = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Crect width='200' height='200' fill='%23cccccc'/%3E%3Ctext x='50%25' y='50%25' font-size='18' text-anchor='middle' alignment-baseline='middle' font-family='Arial, sans-serif' fill='%23666666'%3ENo Image%3C/text%3E%3C/svg%3E";

function Image({ images = [] }) {
  const getImageUrl = (imagePath) => {
    if (!imagePath) return placeholderImage;
    
    const formattedPath = imagePath.startsWith('/uploads/') 
      ? imagePath 
      : `/uploads/${imagePath}`;
      
    return `http://localhost:3000${formattedPath}`;
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
        {images.map((image, index) => (
          <div 
            key={index}
            className="relative aspect-[4/3] overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <img
              src={getImageUrl(image)}
              alt={`Salon image ${index + 1}`}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              loading="lazy"
              onError={(e) => {
                console.error(`Failed to load image: ${e.target.src}`);
                e.target.onerror = null;
                e.target.src = placeholderImage;
              }}
            />
          </div>
        ))}

        {images.length < 3 && Array.from({ length: 3 - images.length }).map((_, index) => (
          <div 
            key={`placeholder-${index}`}
            className="relative aspect-[4/3] overflow-hidden rounded-lg bg-gray-100"
          >
            <div className="absolute inset-0 flex items-center justify-center text-gray-400">
              <span className="text-sm">No image</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Image;