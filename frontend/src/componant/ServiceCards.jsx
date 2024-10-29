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

      console.log('Fetching services...');
      const response = await axios.get(
        "http://localhost:3000/api/salon-ownerDahboord/services",
        {
          headers: {
            "x-auth-token": token,
            "Content-Type": "application/json"
          },
        }
      );

      console.log('Services response:', response.data);

      if (response.data && Array.isArray(response.data.services)) {
        setServices(response.data.services);
      } else {
        console.error('Invalid services data:', response.data);
        antMessage.error("Invalid services data received");
      }
    } catch (error) {
      console.error("Error fetching services:", error.response || error);
      const errorMessage = error.response?.data?.message || "Failed to fetch services";
      antMessage.error(errorMessage);
      
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        // Redirect to login if needed
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
      <div className="p-6">
        <div className="mb-8 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 p-6 rounded-xl">
          <h1 className="text-3xl font-bold text-gray-800">Services</h1>
          <p className="text-gray-700 mt-2">Manage your salon's services</p>
        </div>

        {/* Add New Service Form */}
        <div className="mb-8 p-6 bg-white rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Add New Service</h2>
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Service Name"
              value={newService.name}
              onChange={(e) =>
                setNewService({ ...newService, name: e.target.value })
              }
              className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-200"
            />
            <input
              type="number"
              placeholder="Price"
              value={newService.price}
              onChange={(e) =>
                setNewService({ ...newService, price: e.target.value })
              }
              className="w-32 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-200"
            />
            <button
              onClick={handleAddService}
              className="px-6 py-2 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 rounded-lg hover:opacity-90"
            >
              Add Service
            </button>
          </div>
        </div>

        {/* Services List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div
              key={service._id}
              className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              {editingService && editingService._id === service._id ? (
                <div className="space-y-4">
                  <input
                    type="text"
                    value={editingService.name}
                    onChange={(e) =>
                      setEditingService({
                        ...editingService,
                        name: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-200"
                  />
                  <input
                    type="number"
                    value={editingService.price}
                    onChange={(e) =>
                      setEditingService({
                        ...editingService,
                        price: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-200"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleUpdateService(service._id)}
                      className="flex-1 px-4 py-2 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 rounded-lg hover:opacity-90"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingService(null)}
                      className="flex-1 px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <h3 className="text-xl font-semibold mb-2">{service.name}</h3>
                  <p className="text-gray-600 mb-4">JOD {service.price}</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setEditingService(service)}
                      className="flex-1 px-4 py-2 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 rounded-lg hover:opacity-90"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteService(service._id)}
                      className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
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
