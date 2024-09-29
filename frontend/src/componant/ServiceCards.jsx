import React, { useEffect, useState } from "react";
import axios from "axios";
import DashboardLayout from "./DashboardLayout";

const ServiceCards = () => {
  const [services, setServices] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [serviceDetails, setServiceDetails] = useState({ name: "", price: "" });

  const userRole = "admin"; // Replace with actual user role
  const hasSalonProfile = true;

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:3000/api/salon-ownerDahboord/get",
          {
            headers: {
              "x-auth-token": token,
            },
          }
        );
        setServices(response.data.services || []);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };
    fetchServices();
  }, []);

  const handleEditClick = (index) => {
    setEditingIndex(index);
    setServiceDetails(services[index]);
  };

  const handleChange = (e) => {
    setServiceDetails({ ...serviceDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:3000/api/salon-ownerDahboord/update/${editingIndex}`,
        serviceDetails,
        {
          headers: {
            "x-auth-token": token,
          },
        }
      );
      setServices((prev) =>
        prev.map((service, index) =>
          index === editingIndex ? serviceDetails : service
        )
      );
      setEditingIndex(null);
      setServiceDetails({ name: "", price: "" });
    } catch (error) {
      console.error("Error updating service:", error);
    }
  };

  return (
    <DashboardLayout userRole={userRole} hasSalonProfile={hasSalonProfile}>
      {" "}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6 bg-gray-100">
        {services.map((service, index) => (
          <div
            key={index}
            className={`bg-white shadow-lg rounded-xl p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-xl ${
              editingIndex === index ? "h-auto" : "h-64"
            }`}
          >
            <div>
              <h2 className="text-2xl font-bold mb-2 text-gray-800">
                {service.name}
              </h2>
              <p className="text-gray-600 text-lg font-semibold mb-4">
                Price: {service.price} JD
              </p>
            </div>
            {editingIndex !== index ? (
              <button
                onClick={() => handleEditClick(index)}
                className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                Edit Service
              </button>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="mt-4 bg-gray-50 p-4 rounded-lg"
              >
                <input
                  type="text"
                  name="name"
                  value={serviceDetails.name}
                  onChange={handleChange}
                  placeholder="Service Name"
                  className="border border-gray-300 p-2 w-full rounded-md mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <input
                  type="number"
                  name="price"
                  value={serviceDetails.price}
                  onChange={handleChange}
                  placeholder="Service Price"
                  className="border border-gray-300 p-2 w-full rounded-md mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <div className="flex justify-between mt-2">
                  <button
                    type="submit"
                    className="bg-green-500 text-white py-2 px-4 rounded-full hover:bg-green-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                  >
                    Update
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingIndex(null)}
                    className="bg-red-500 text-white py-2 px-4 rounded-full hover:bg-red-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default ServiceCards;
