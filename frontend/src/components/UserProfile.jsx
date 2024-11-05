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

    // Redirect to signin if no userId or token is found
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

        // Fetch user info
        const userResponse = await axios.get(
          `http://localhost:3000/api/users/${userId}`,
          config
        );
        setUserInfo(userResponse.data);

        // Fetch user bookings
        const bookingsResponse = await axios.get(
          `http://localhost:3000/api/users/${userId}/bookings`,
          config
        );
        
        // Check if bookings exist in the response
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
    if (type === "upcoming") {
      return bookings.filter(
        (booking) => new Date(booking.appointmentDate) >= now
      );
    }
    return bookings.filter(
      (booking) => new Date(booking.appointmentDate) < now
    );
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

      // Refresh bookings after cancellation
      const bookingsResponse = await axios.get(
        `http://localhost:3000/api/users/${userId}/bookings`,
        {
          headers: {
            'x-auth-token': token,
            "Content-Type": "application/json",
          },
        }
      );
      setBookings(bookingsResponse.data.bookings); // Note: accessing .bookings from response
    } catch (err) {
      console.error("Error cancelling booking:", err);
      setError("Failed to cancel booking");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 py-8">
        <div className="max-w-6xl mx-auto px-4">
          {/* User Info Section */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
                <span className="text-2xl text-gray-600">
                  {userInfo?.username?.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">
                  {userInfo?.username}
                </h1>
                <p className="text-gray-600">{userInfo?.email}</p>
              </div>
            </div>
          </div>

          {/* Bookings Section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex space-x-4 mb-6">
              <button
                onClick={() => setActiveTab("upcoming")}
                className={`px-4 py-2 rounded-lg ${
                  activeTab === "upcoming"
                    ? "bg-red-200 text-gray-900"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                Upcoming Appointments
              </button>
              <button
                onClick={() => setActiveTab("past")}
                className={`px-4 py-2 rounded-lg ${
                  activeTab === "past"
                    ? "bg-red-200 text-gray-900"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                Past Appointments
              </button>
            </div>

            <div className="space-y-4">
              {filterBookings(activeTab).map((booking) => (
                <div
                  key={booking._id}
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-lg">
                        Appointment at {booking.salonId?.owner?.salonName}
                      </h3>
                      <p className="text-gray-600">
                        {new Date(booking.appointmentDate).toLocaleDateString(
                          "en-US",
                          {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                        {" at "}
                        {booking.appointmentTime}
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        booking.status === "confirmed"
                          ? "bg-green-100 text-green-800"
                          : booking.status === "cancelled"
                          ? "bg-red-100 text-red-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {booking.status.charAt(0).toUpperCase() +
                        booking.status.slice(1)}
                    </span>
                  </div>

                  {/* Services */}
                  <div className="mt-4">
                    <h4 className="font-medium text-gray-700 mb-2">
                      Services:
                    </h4>
                    <div className="space-y-2">
                      {booking.services.map((service, index) => (
                        <div
                          key={index}
                          className="flex justify-between text-sm"
                        >
                          <span>{service.name}</span>
                          <span>JOD {service.price}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-600">Total Amount:</p>
                      <p className="font-semibold">JOD {booking.totalAmount}</p>
                    </div>
                    {activeTab === "upcoming" &&
                      booking.status !== "cancelled" && (
                        <button
                          onClick={() => handleCancelBooking(booking._id)}
                          className="text-red-600 hover:text-red-800 font-medium"
                        >
                          Cancel Booking
                        </button>
                      )}
                  </div>
                </div>
              ))}

              {filterBookings(activeTab).length === 0 && (
                <div className="text-center py-8 text-gray-500">
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
