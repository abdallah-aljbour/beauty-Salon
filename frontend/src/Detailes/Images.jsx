import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function Image({ images = [] }) {
  return (
    <div className="grid grid-cols-3 gap-4 m-8">
      {images.map((image, index) => (
        <img
          key={index}
          src={`http://localhost:3000${image}`}
          alt={`Salon image ${index + 1}`}
          className="w-full h-64 object-cover rounded-lg"
          onError={(e) => {
            console.error(`Failed to load image: ${e.target.src}`);
            e.target.src = "fallback-image-url";
          }}
        />
      ))}
    </div>
  );
}

export default Image;