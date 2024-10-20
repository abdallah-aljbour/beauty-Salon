import React, { useState } from "react";
import axios from "axios";

const AddServiceForm = () => {
  // State to manage form input values
  const [serviceName, setServiceName] = useState("");
  const [servicePrice, setServicePrice] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Get JWT token (assuming it is stored in localStorage )
    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(
        "http://localhost:3000/api/salon-ownerDahboord/Addservices",
        {
          name: serviceName,
          price: parseFloat(servicePrice),
        },
        {
          headers: {
            "x-auth-token": token,
          },
        }
      );

      if (response.status === 201) {
        alert("Service added successfully!");
        setServiceName("");
        setServicePrice("");
      }
    } catch (error) {
      console.error("Error adding service:", error);
      alert("Failed to add service. Please try again.");
    }
    console.log("Service Name:", serviceName);
    console.log("Service Price:", servicePrice);
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg max-w-md w-full p-6 space-y-6">
        {/* Form Header */}
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-800">
            Add New Service
          </h2>
          <p className="text-gray-500 mt-1">
            Fill out the form to add a service to your salon.
          </p>
        </div>

        {/* Input Fields */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="service-name"
            >
              Service Name
            </label>
            <input
              type="text"
              id="service-name"
              value={serviceName}
              onChange={(e) => setServiceName(e.target.value)}
              placeholder="Enter service name"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="service-price"
            >
              Service Price
            </label>
            <input
              type="number"
              id="service-price"
              value={servicePrice}
              onChange={(e) => setServicePrice(e.target.value)}
              placeholder="Enter service price"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Add Service
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddServiceForm;
