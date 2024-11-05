import React, { useState, useCallback, useEffect } from "react";
import axios from "axios";
import DashboardLayout from "./DashboardLayout";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  Autocomplete,
} from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const center = {
  lat: 31.950192,
  lng: 35.937502,
};

const SalonProfileForm = () => {
  const [formData, setFormData] = useState({
    images: [],
    services: [{ name: "", price: "" }],
    city: "",
    bio: "",
    location: center,
    openingHours: {
      monday: { open: "", close: "", isOpen: true },
      tuesday: { open: "", close: "", isOpen: true },
      wednesday: { open: "", close: "", isOpen: true },
      thursday: { open: "", close: "", isOpen: true },
      friday: { open: "", close: "", isOpen: true },
      saturday: { open: "", close: "", isOpen: true },
      sunday: { open: "", close: "", isOpen: true },
    },
  });

  const [message, setMessage] = useState("");

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyCuxqS_u2OAB8x4NkvGn5_h_NO_sDE3JZM",
    libraries: ["places"],
  });

  const [map, setMap] = useState(null);
  const [autocomplete, setAutocomplete] = useState(null);

  useEffect(() => {
    fetchOpeningHours();
  }, []);

  const fetchOpeningHours = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:3000/api/salon-ownerDahboord/opening-hours",
        {
          headers: {
            "x-auth-token": token,
          },
        }
      );

      console.log("Fetched opening hours:", response.data); // Debug log

      if (response.data.openingHours) {
        setFormData((prev) => ({
          ...prev,
          openingHours: response.data.openingHours,
        }));
      }
    } catch (err) {
      console.error("Error fetching opening hours:", err);
      // Handle error appropriately
    }
  };

  const onLoad = useCallback(function callback(map) {
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  const handleMapClick = (event) => {
    if (!event.latLng) return;
    
    const lat = Number(event.latLng.lat());
    const lng = Number(event.latLng.lng());
    
    console.log("Map clicked - Lat:", lat, "Lng:", lng); // Debug log
    
    // Ensure the coordinates are valid numbers
    if (isNaN(lat) || isNaN(lng)) {
      setMessage("Invalid location coordinates");
      return;
    }

    const newLocation = {
      lat: lat,
      lng: lng
    };
    
    console.log("Setting new location:", newLocation); // Debug log
    
    setFormData(prev => ({
      ...prev,
      location: newLocation
    }));

    // Update marker position
    if (map) {
      map.panTo(newLocation);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setFormData({ ...formData, images: files });
  };

  const handleServiceChange = (index, e) => {
    const newServices = [...formData.services];
    newServices[index][e.target.name] = e.target.value;
    setFormData({ ...formData, services: newServices });
  };

  const addService = () => {
    setFormData({
      ...formData,
      services: [...formData.services, { name: "", price: "" }],
    });
  };

  const handleOpeningHoursChange = (day, field, value) => {
    setFormData((prev) => ({
      ...prev,
      openingHours: {
        ...prev.openingHours,
        [day]: {
          ...prev.openingHours[day],
          [field]: value,
        },
      },
    }));
  };

  const handleToggleDay = (day) => {
    setFormData((prev) => ({
      ...prev,
      openingHours: {
        ...prev.openingHours,
        [day]: {
          ...prev.openingHours[day],
          isOpen: !prev.openingHours[day].isOpen,
        },
      },
    }));
  };

  const handlePlaceChanged = () => {
    if (autocomplete) {
      const place = autocomplete.getPlace();
      if (place.geometry) {
        const newLocation = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        };
        setFormData((prevData) => ({
          ...prevData,
          location: newLocation,
        }));
        if (map) {
          map.panTo(newLocation); // Center map on selected location
          map.setZoom(15); // Optional: Adjust zoom level
        }
      } else {
        console.error("No geometry found for the selected place.");
      }
    } else {
      console.error("Autocomplete is not initialized.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("No token found. Please log in.");
      }

      // Validate location
      if (!formData.location || !formData.location.lat || !formData.location.lng) {
        setMessage("Please select a location on the map");
        return;
      }

      // Create FormData to handle file uploads
      const formDataToSend = new FormData();
      
      // Append images
      if (formData.images && formData.images.length > 0) {
        formData.images.forEach((image, index) => {
          formDataToSend.append('images', image);
        });
      }

      // Validate and format services
      const services = formData.services.filter(service => service.name && service.price);
      formDataToSend.append('services', JSON.stringify(services));

      // Append other data
      formDataToSend.append('city', formData.city || '');
      formDataToSend.append('bio', formData.bio || '');
      
      // Format location data
      const locationData = {
        lat: Number(formData.location.lat),
        lng: Number(formData.location.lng)
      };
      formDataToSend.append('location', JSON.stringify(locationData));
      
      // Format opening hours
      formDataToSend.append('openingHours', JSON.stringify(formData.openingHours));

      // Log the data being sent
      for (let pair of formDataToSend.entries()) {
        console.log(pair[0], pair[1]);
      }

      const response = await axios.post(
        "http://localhost:3000/api/salon-ownerDahboord",
        formDataToSend,
        {
          headers: {
            "x-auth-token": token,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        setMessage("Salon profile created successfully!");
        alert("Salon profile created successfully!");
      } else {
        throw new Error(response.data.message || "Failed to create salon profile");
      }
    } catch (error) {
      console.error("Failed to create salon profile:", error);
      const errorMessage = error.response?.data?.message || error.message || "Failed to create salon profile. Please try again.";
      setMessage(errorMessage);
      alert(errorMessage);
    }
};

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gray-50 py-6 flex flex-col justify-center sm:py-12">
        <div className="relative py-3 sm:max-w-4xl sm:mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
          <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
            <div className="max-w-3xl mx-auto">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-8">
                  Salon Profile
                </h1>
              </div>

              {message && (
                <div
                  className={`mt-4 p-4 rounded-md ${
                    message.startsWith("Error")
                      ? "bg-red-50 text-red-500 border border-red-200"
                      : "bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 text-gray-900"
                  }`}
                >
                  {message}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-4">
                  <label className="block text-lg font-medium text-gray-900">
                    Salon Images (up to 3)
                  </label>
                  <input
                    type="file"
                    multiple
                    onChange={handleImageUpload}
                    accept="image/*"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-200 focus:border-red-300 transition-colors"
                  />
                </div>

                <div className="space-y-4">
                  <label className="block text-lg font-medium text-gray-900">
                    Services
                  </label>
                  {formData.services.map((service, index) => (
                    <div key={index} className="flex gap-4">
                      <input
                        type="text"
                        name="name"
                        value={service.name}
                        onChange={(e) => handleServiceChange(index, e)}
                        placeholder="Service name"
                        className="flex-1 px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-200 focus:border-red-300 transition-colors"
                      />
                      <input
                        type="number"
                        name="price"
                        value={service.price}
                        onChange={(e) => handleServiceChange(index, e)}
                        placeholder="Price"
                        className="w-32 px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-200 focus:border-red-300 transition-colors"
                      />
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addService}
                    className="px-6 py-2 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 text-gray-900 rounded-lg hover:opacity-90 transition-opacity"
                  >
                    Add Service
                  </button>
                </div>

                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label className="block text-lg font-medium text-gray-900">
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-200 focus:border-red-300 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-lg font-medium text-gray-900">
                      Bio
                    </label>
                    <textarea
                      name="bio"
                      value={formData.bio}
                      onChange={handleChange}
                      rows="4"
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-200 focus:border-red-300 transition-colors"
                    ></textarea>
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="block text-lg font-medium text-gray-900">
                    Location
                  </label>
                  {isLoaded ? (
                    <div className="space-y-4">
                      <Autocomplete
                        onLoad={setAutocomplete}
                        onPlaceChanged={handlePlaceChanged}
                      >
                        <input
                          type="text"
                          placeholder="Search for salon location..."
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-200 focus:border-red-300 transition-colors"
                        />
                      </Autocomplete>

                      <div className="h-[400px] rounded-lg overflow-hidden border border-gray-200">
                        <GoogleMap
                          mapContainerStyle={containerStyle}
                          center={formData.location}
                          zoom={15}
                          onLoad={onLoad}
                          onUnmount={onUnmount}
                          onClick={handleMapClick}
                        >
                          {formData.location && (
                            <Marker
                              position={{
                                lat: parseFloat(formData.location.lat),
                                lng: parseFloat(formData.location.lng)
                              }}
                            />
                          )}
                        </GoogleMap>
                      </div>
                    </div>
                  ) : (
                    <div className="h-[400px] bg-gray-100 rounded-lg flex items-center justify-center">
                      Loading map...
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <label className="block text-lg font-medium text-gray-900">
                    Opening Hours
                  </label>
                  {Object.entries(formData.openingHours).map(([day, hours]) => (
                    <div key={day} className="flex items-center space-x-4">
                      <div className="flex items-center w-32">
                        <input
                          type="checkbox"
                          checked={hours.isOpen}
                          onChange={() => handleToggleDay(day)}
                          className="mr-2 h-4 w-4 text-red-300 focus:ring-red-200 border-gray-300 rounded"
                        />
                        <span className="capitalize">{day}</span>
                      </div>
                      {hours.isOpen ? (
                        <div className="flex items-center space-x-4">
                          <input
                            type="time"
                            value={hours.open}
                            onChange={(e) =>
                              handleOpeningHoursChange(
                                day,
                                "open",
                                e.target.value
                              )
                            }
                            className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-200 focus:border-red-300 transition-colors"
                          />
                          <span>to</span>
                          <input
                            type="time"
                            value={hours.close}
                            onChange={(e) =>
                              handleOpeningHoursChange(
                                day,
                                "close",
                                e.target.value
                              )
                            }
                            className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-200 focus:border-red-300 transition-colors"
                          />
                        </div>
                      ) : (
                        <span className="text-gray-500">Closed</span>
                      )}
                    </div>
                  ))}
                </div>

                <div className="pt-8">
                  <button
                    type="submit"
                    className="w-full py-3 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 text-gray-900 rounded-lg hover:opacity-90 transition-opacity font-semibold"
                  >
                    Create Profile
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SalonProfileForm;