import React, { useState, useCallback } from "react";
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
    location: { lat: "", lng: "" },
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

  const onLoad = useCallback(function callback(map) {
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  const handleMapClick = (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    setFormData({
      ...formData,
      location: { lat, lng },
    });
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
    setFormData((prevData) => ({
      ...prevData,
      openingHours: {
        ...prevData.openingHours,
        [day]: {
          ...prevData.openingHours[day],
          [field]: value,
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
    const jsonData = new FormData();

    formData.images.forEach((image) => {
      jsonData.append(`images`, image);
    });
    jsonData.append("services", JSON.stringify(formData.services));
    jsonData.append("city", formData.city);
    jsonData.append("bio", formData.bio);
    jsonData.append("location", JSON.stringify(formData.location));
    jsonData.append("openingHours", JSON.stringify(formData.openingHours));

    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found. User may not be authenticated.");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:3000/api/salon-ownerDahboord/createService",
        jsonData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "x-auth-token": token,
          },
        }
      );
      setMessage("Profile created successfully!");
      console.log("Profile created:", res.data);
    } catch (err) {
      setMessage(
        `Error creating profile: ${err.response?.data?.msg || err.message}`
      );
    }
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
          <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
            <div className="max-w-md mx-auto">
              <div>
                <h1 className="text-2xl font-semibold">Salon Profile</h1>
              </div>
              {message && (
                <div
                  className={`mt-4 p-4 text-white rounded-md ${
                    message.startsWith("Error") ? "bg-red-500" : "bg-green-500"
                  }`}
                >
                  {message}
                </div>
              )}
              <form
                onSubmit={handleSubmit}
                className="divide-y divide-gray-200"
              >
                <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                  <div className="flex flex-col">
                    <label className="leading-loose">
                      Salon Images (up to 3)
                    </label>
                    <input
                      type="file"
                      multiple
                      onChange={handleImageUpload}
                      accept="image/*"
                      className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                    />
                  </div>

                  <div className="flex flex-col">
                    <label className="leading-loose">Services</label>
                    {formData.services.map((service, index) => (
                      <div key={index} className="flex space-x-4 mt-2">
                        <input
                          type="text"
                          name="name"
                          value={service.name}
                          onChange={(e) => handleServiceChange(index, e)}
                          placeholder="Service name"
                          className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                        />
                        <input
                          type="number"
                          name="price"
                          value={service.price}
                          onChange={(e) => handleServiceChange(index, e)}
                          placeholder="Price"
                          className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                        />
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={addService}
                      className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    >
                      Add Service
                    </button>
                  </div>

                  <div className="flex flex-col">
                    <label className="leading-loose">City</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                    />
                  </div>

                  <div className="flex flex-col">
                    <label className="leading-loose">Bio</label>
                    <textarea
                      name="bio"
                      value={formData.bio}
                      onChange={handleChange}
                      className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                      rows="4"
                    ></textarea>
                  </div>

                  <div className="flex flex-col">
                    <label className="leading-loose">Location</label>
                    {isLoaded ? (
                      <GoogleMap
                        mapContainerStyle={containerStyle}
                        center={center}
                        zoom={10}
                        onLoad={onLoad}
                        onUnmount={onUnmount}
                        onClick={handleMapClick}
                      >
                        {formData.location.lat && formData.location.lng && (
                          <Marker
                            position={{
                              lat: parseFloat(formData.location.lat),
                              lng: parseFloat(formData.location.lng),
                            }}
                          />
                        )}
                        <Autocomplete
                          onLoad={setAutocomplete}
                          onPlaceChanged={handlePlaceChanged}
                          options={{
                            componentRestrictions: { country: "jo" },
                            types: ["establishment"], // Optional: Limit to establishments
                          }}
                        >
                          <input
                            type="text"
                            placeholder="Search for salon location..."
                            className="border rounded-md px-4 py-2"
                          />
                        </Autocomplete>
                      </GoogleMap>
                    ) : (
                      <></>
                    )}
                    <div className="mt-2">
                      <p>
                        Selected Location: {formData.location.lat},{" "}
                        {formData.location.lng}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <label className="leading-loose">Opening Hours</label>
                    {Object.entries(formData.openingHours).map(
                      ([day, hours]) => (
                        <div
                          key={day}
                          className="flex items-center space-x-4 mt-2"
                        >
                          <span className="w-24">{day}:</span>
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
                            className="px-2 py-1 border focus:ring-gray-500 focus:border-gray-900 sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                          />
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
                            className="px-2 py-1 border focus:ring-gray-500 focus:border-gray-900 sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                          />
                          <label className="inline-flex items-center">
                            <input
                              type="checkbox"
                              checked={hours.isOpen}
                              onChange={(e) =>
                                handleOpeningHoursChange(
                                  day,
                                  "isOpen",
                                  e.target.checked
                                )
                              }
                              className="form-checkbox h-5 w-5 text-blue-600"
                            />
                            <span className="ml-2 text-gray-700">Open</span>
                          </label>
                        </div>
                      )
                    )}
                  </div>
                </div>
                <div className="pt-4 flex items-center space-x-4">
                  <button
                    type="submit"
                    className="bg-blue-500 flex justify-center items-center w-full text-white px-4 py-3 rounded-md focus:outline-none hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
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
