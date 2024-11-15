import React, { useState, useEffect } from "react";
import axios from "axios";
import DashboardLayout from "./DashboardLayout";
import { message as antMessage } from "antd";
import ErrorBoundary from './ErrorBoundary';

const ServiceCards = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingService, setEditingService] = useState(null);
  const [newService, setNewService] = useState({ name: "", price: "" });

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        antMessage.error("Authentication required");
        setLoading(false);
        return;
      }

      const response = await axios.get(
        "http://localhost:3000/api/salon-ownerDahboord/services",
        {
          headers: {
            "x-auth-token": token,
            "Content-Type": "application/json"
          },
        }
      );

      if (response.data && Array.isArray(response.data.services)) {
        setServices(response.data.services);
      } else {
        antMessage.error("Invalid services data received");
      }
    } catch (error) {
      console.error("Error fetching services:", error);
      const errorMessage = error.response?.data?.message || "Failed to fetch services";
      antMessage.error(errorMessage);
      
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleAddService = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:3000/api/salon-ownerDahboord/services",
        newService,
        {
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": token,
          },
        }
      );

      setServices([...services, response.data.service]);
      setNewService({ name: "", price: "" });
      antMessage.success("Service added successfully");
    } catch (error) {
      console.error("Error adding service:", error);
      antMessage.error("Failed to add service");
    }
  };

  const handleUpdateService = async (serviceId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:3000/api/salon-ownerDahboord/services/${serviceId}`,
        editingService,
        {
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": token,
          },
        }
      );

      setServices(
        services.map((service) =>
          service._id === serviceId ? { ...service, ...editingService } : service
        )
      );
      setEditingService(null);
      antMessage.success("Service updated successfully");
    } catch (error) {
      console.error("Error updating service:", error);
      antMessage.error("Failed to update service");
    }
  };

  const handleDeleteService = async (serviceId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `http://localhost:3000/api/salon-ownerDahboord/services/${serviceId}`,
        {
          headers: {
            "x-auth-token": token,
          },
        }
      );

      setServices(services.filter((service) => service._id !== serviceId));
      antMessage.success("Service deleted successfully");
    } catch (error) {
      console.error("Error deleting service:", error);
      antMessage.error("Failed to delete service");
    }
  };

  return (
    <DashboardLayout>
      <div className="p-4 sm:p-6 lg:p-8">
        {/* Header Section */}
        <div className="mb-6 sm:mb-8 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 p-4 sm:p-6 rounded-xl">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800">Services</h1>
          <p className="text-sm sm:text-base text-gray-700 mt-2">Manage your salon's services</p>
        </div>

        {/* Add New Service Form */}
        <div className="mb-6 sm:mb-8 p-4 sm:p-6 bg-white rounded-xl shadow-sm">
          <h2 className="text-lg sm:text-xl font-semibold mb-4">Add New Service</h2>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <input
              type="text"
              placeholder="Service Name"
              value={newService.name}
              onChange={(e) => setNewService({ ...newService, name: e.target.value })}
              className="flex-1 px-3 py-2 sm:px-4 sm:py-3 border rounded-lg focus:ring-2 focus:ring-red-200 text-sm sm:text-base"
            />
            <input
              type="number"
              placeholder="Price"
              value={newService.price}
              onChange={(e) => setNewService({ ...newService, price: e.target.value })}
              className="w-full sm:w-32 px-3 py-2 sm:px-4 sm:py-3 border rounded-lg focus:ring-2 focus:ring-red-200 text-sm sm:text-base"
            />
            <button
              onClick={handleAddService}
              className="w-full sm:w-auto px-4 py-2 sm:px-6 sm:py-3 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 rounded-lg hover:opacity-90 text-sm sm:text-base font-medium"
            >
              Add Service
            </button>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {services.map((service) => (
            <div
              key={service._id}
              className="p-4 sm:p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              {editingService && editingService._id === service._id ? (
                <div className="space-y-3">
                  <input
                    type="text"
                    value={editingService.name}
                    onChange={(e) => setEditingService({
                      ...editingService,
                      name: e.target.value,
                    })}
                    className="w-full px-3 py-2 sm:px-4 sm:py-3 border rounded-lg focus:ring-2 focus:ring-red-200 text-sm sm:text-base"
                  />
                  <input
                    type="number"
                    value={editingService.price}
                    onChange={(e) => setEditingService({
                      ...editingService,
                      price: e.target.value,
                    })}
                    className="w-full px-3 py-2 sm:px-4 sm:py-3 border rounded-lg focus:ring-2 focus:ring-red-200 text-sm sm:text-base"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleUpdateService(service._id)}
                      className="flex-1 px-3 py-2 sm:px-4 sm:py-3 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 rounded-lg hover:opacity-90 text-sm sm:text-base"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingService(null)}
                      className="flex-1 px-3 py-2 sm:px-4 sm:py-3 bg-gray-200 rounded-lg hover:bg-gray-300 text-sm sm:text-base"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <h3 className="text-lg sm:text-xl font-semibold mb-2">{service.name}</h3>
                  <p className="text-sm sm:text-base text-gray-600 mb-4">JOD {service.price}</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setEditingService(service)}
                      className="flex-1 px-3 py-2 sm:px-4 sm:py-3 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 rounded-lg hover:opacity-90 text-sm sm:text-base"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteService(service._id)}
                      className="flex-1 px-3 py-2 sm:px-4 sm:py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 text-sm sm:text-base"
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

const ServiceCardsWithErrorBoundary = () => {
  return (
    <ErrorBoundary>
      <ServiceCards />
    </ErrorBoundary>
  );
};

export default ServiceCardsWithErrorBoundary;
