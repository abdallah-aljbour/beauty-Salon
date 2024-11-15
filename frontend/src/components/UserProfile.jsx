import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../Navbar";

function UserProfile() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("upcoming");

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    if (!userId || !token) {
      navigate("/signin");
      return;
    }

    const fetchUserData = async () => {
      try {
        const config = {
          headers: {
            'x-auth-token': token,
            "Content-Type": "application/json",
          },
        };

        const userResponse = await axios.get(
          `http://localhost:3000/api/users/${userId}`,
          config
        );
        setUserInfo(userResponse.data);

        const bookingsResponse = await axios.get(
          `http://localhost:3000/api/users/${userId}/bookings`,
          config
        );
        
        if (bookingsResponse.data && bookingsResponse.data.bookings) {
          setBookings(bookingsResponse.data.bookings);
        } else {
          setBookings([]);
        }
        
      } catch (err) {
        console.error("Error fetching user data:", err);
        if (err.response?.status === 401) {
          localStorage.removeItem("userId");
          localStorage.removeItem("token");
          navigate("/signin");
        } else {
          setError("Failed to load user information");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  const filterBookings = (type) => {
    const now = new Date();
    return type === "upcoming"
      ? bookings.filter((booking) => new Date(booking.appointmentDate) >= now)
      : bookings.filter((booking) => new Date(booking.appointmentDate) < now);
  };

  const handleCancelBooking = async (bookingId) => {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");
    
    try {
      await axios.put(
        `http://localhost:3000/api/users/${userId}/bookings/${bookingId}/cancel`,
        {},
        {
          headers: {
            'x-auth-token': token,
            "Content-Type": "application/json",
          },
        }
      );

      const bookingsResponse = await axios.get(
        `http://localhost:3000/api/users/${userId}/bookings`,
        {
          headers: {
            'x-auth-token': token,
            "Content-Type": "application/json",
          },
        }
      );
      setBookings(bookingsResponse.data.bookings);
    } catch (err) {
      console.error("Error cancelling booking:", err);
      setError("Failed to cancel booking");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-300"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center p-4">{error}</div>;
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-6 sm:py-8 lg:py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          {/* User Info Section */}
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 lg:p-8 mb-6">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
              <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
                <span className="text-2xl text-gray-600">
                  {userInfo?.username?.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="text-center sm:text-left">
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800">
                  {userInfo?.username}
                </h1>
                <p className="text-sm sm:text-base text-gray-600">{userInfo?.email}</p>
              </div>
            </div>
          </div>

          {/* Bookings Section */}
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 lg:p-8">
            {/* Tabs */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mb-6">
              <button
                onClick={() => setActiveTab("upcoming")}
                className={`px-4 py-2 rounded-lg text-sm sm:text-base transition-colors ${
                  activeTab === "upcoming"
                    ? "bg-red-200 text-gray-900"
                    : "bg-gray-100 text-gray-600 hover:bg-red-100"
                }`}
              >
                Upcoming Appointments
              </button>
              <button
                onClick={() => setActiveTab("past")}
                className={`px-4 py-2 rounded-lg text-sm sm:text-base transition-colors ${
                  activeTab === "past"
                    ? "bg-red-200 text-gray-900"
                    : "bg-gray-100 text-gray-600 hover:bg-red-100"
                }`}
              >
                Past Appointments
              </button>
            </div>

            {/* Bookings List */}
            <div className="space-y-4">
              {filterBookings(activeTab).map((booking) => (
                <div
                  key={booking._id}
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-4">
                    <div>
                      <h3 className="text-base sm:text-lg font-semibold">
                        Appointment at {booking.salonId?.owner?.salonName}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {new Date(booking.appointmentDate).toLocaleDateString("en-US", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                        {" at "}
                        {booking.appointmentTime}
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs sm:text-sm ${
                        booking.status === "confirmed"
                          ? "bg-green-100 text-green-800"
                          : booking.status === "cancelled"
                          ? "bg-red-100 text-red-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </span>
                  </div>

                  {/* Services */}
                  <div className="mt-4">
                    <h4 className="font-medium text-gray-700 mb-2">Services:</h4>
                    <div className="space-y-2">
                      {booking.services.map((service, index) => (
                        <div key={index} className="flex justify-between text-sm">
                          <span>{service.name}</span>
                          <span>JOD {service.price}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                    <div>
                      <p className="text-xs sm:text-sm text-gray-600">Total Amount:</p>
                      <p className="font-semibold">JOD {booking.totalAmount}</p>
                    </div>
                    {activeTab === "upcoming" && booking.status !== "cancelled" && (
                      <button
                        onClick={() => handleCancelBooking(booking._id)}
                        className="text-red-600 hover:text-red-800 font-medium text-sm sm:text-base"
                      >
                        Cancel Booking
                      </button>
                    )}
                  </div>
                </div>
              ))}

              {filterBookings(activeTab).length === 0 && (
                <div className="text-center py-8 text-gray-500 text-sm sm:text-base">
                  No {activeTab} appointments found
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserProfile;
