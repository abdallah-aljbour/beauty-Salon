import React, { useState, useEffect } from "react";
import axios from "axios";
import DashboardLayout from "./DashboardLayout";
import { useNavigate } from "react-router-dom";

const SalonOwnerProfile = () => {
  const [profile, setProfile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    salonName: "",
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
  });
  const [error, setError] = useState("");
  const [passwordVerified, setPasswordVerified] = useState(false);
  const [verifiedPassword, setVerifiedPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/signin');
      return;
    }
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      console.log('Fetching profile with token:', token); // Debug log

      const config = {
        headers: {
          'x-auth-token': token,
          'Content-Type': 'application/json'
        }
      };

      const res = await axios.get(
        "http://localhost:3000/api/salon-ownerDahboord/profile",
        config
      );
      
      console.log('Profile response:', res.data); // Debug log

      if (res.data) {
        setProfile(res.data);
        setFormData({
          username: res.data.username || '',
          salonName: res.data.salonName || '',
        });
      } else {
        throw new Error('Invalid profile data received');
      }
    } catch (err) {
      console.error("Error fetching profile:", err);
      if (err.response?.status === 401) {
        localStorage.removeItem('token');
        navigate('/signin');
      } else if (err.response?.status === 404) {
        setError("Profile not found. Please complete your registration.");
      } else {
        setError(err.message || "Failed to fetch profile. Please try again.");
      }
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({ ...passwordData, [name]: value });

    if (name === "currentPassword" && value !== verifiedPassword) {
      setPasswordVerified(false);
    }
  };

  const handleCheckPassword = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "http://localhost:3000/api/salon-ownerDahboord/verify-password",
        { currentPassword: passwordData.currentPassword },
        {
          headers: {
            "x-auth-token": token,
          },
        }
      );
      if (res.data.verified) {
        setPasswordVerified(true);
        setVerifiedPassword(passwordData.currentPassword);
        setError("");
      } else {
        setPasswordVerified(false);
        setVerifiedPassword("");
        setError("Current password is incorrect.");
      }
    } catch (err) {
      console.error("Error verifying password:", err);
      setPasswordVerified(false);
      setVerifiedPassword("");
      setError("Failed to verify password. Please try again.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate('/signin');
        return;
      }

      console.log('Sending update data:', formData); // Debug log

      const res = await axios.put(
        "http://localhost:3000/api/salon-ownerDahboord/profile",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": token,
          },
        }
      );

      console.log('Update response:', res.data); // Debug log

      // Update local state with the response data
      setProfile(res.data);
      setFormData({
        username: res.data.username,
        salonName: res.data.salonName,
      });
      setEditMode(false);
      setError("");
      
      // Show success message
      alert("Profile updated successfully!");
    } catch (err) {
      console.error("Error updating profile:", err);
      const errorMessage = err.response?.data?.message || "Failed to update profile";
      setError(errorMessage);
      
      if (err.response?.status === 401) {
        localStorage.removeItem('token');
        navigate('/signin');
      }
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (
      !passwordVerified ||
      passwordData.currentPassword !== verifiedPassword
    ) {
      setError("Please verify your current password before changing it.");
      return;
    }
    if (passwordData.newPassword.length < 6) {
      setError("New password must be at least 6 characters long.");
      return;
    }
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(
        "http://localhost:3000/api/salon-ownerDahboord/profile",
        passwordData,
        {
          headers: {
            "x-auth-token": token,
          },
        }
      );
      setPasswordData({ currentPassword: "", newPassword: "" });
      setPasswordVerified(false);
      setVerifiedPassword("");
      setError("");
      setEditMode(false);
      alert("Password changed successfully!");
    } catch (err) {
      console.error("Error changing password:", err);
      setError(
        err.response?.data?.msg ||
          "An error occurred while changing the password"
      );
    }
  };

  const exitEditMode = () => {
    setEditMode(false);
    setPasswordData({ currentPassword: "", newPassword: "" });
    setPasswordVerified(false);
    setVerifiedPassword("");
    setError("");
  };

  if (!profile) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-300"></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 rounded-t-2xl p-8">
          <div className="flex items-center space-x-4">
            <div className="bg-white p-4 rounded-full">
              <svg className="w-12 h-12 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Salon Owner Profile</h1>
              <p className="text-gray-600">Manage your profile and security settings</p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white shadow-lg rounded-b-2xl p-8">
          {error && (
            <div className="mb-6 bg-red-50 border-l-4 border-red-400 p-4 rounded">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}

          {/* Profile Information */}
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Username</label>
                {editMode ? (
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-200 focus:border-red-300 transition-colors"
                  />
                ) : (
                  <p className="px-4 py-2 bg-gray-50 rounded-lg">{profile.username}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Salon Name</label>
                {editMode ? (
                  <input
                    type="text"
                    name="salonName"
                    value={formData.salonName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-200 focus:border-red-300 transition-colors"
                  />
                ) : (
                  <p className="px-4 py-2 bg-gray-50 rounded-lg">{profile.salonName}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Email</label>
                <p className="px-4 py-2 bg-gray-50 rounded-lg">{profile.email}</p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Role</label>
                <p className="px-4 py-2 bg-gray-50 rounded-lg capitalize">{profile.role}</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-4 pt-6">
              {editMode ? (
                <>
                  <button
                    onClick={exitEditMode}
                    className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="px-6 py-2 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 text-gray-900 rounded-lg hover:opacity-90 transition-opacity"
                  >
                    Save Changes
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setEditMode(true)}
                  className="px-6 py-2 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 text-gray-900 rounded-lg hover:opacity-90 transition-opacity"
                >
                  Edit Profile
                </button>
              )}
            </div>

            {/* Password Change Section */}
            {editMode && (
              <div className="mt-8 pt-8 border-t">
                <h3 className="text-xl font-bold text-gray-800 mb-6">Change Password</h3>
                <form onSubmit={handlePasswordSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Current Password
                    </label>
                    <div className="flex space-x-2">
                      <input
                        type="password"
                        name="currentPassword"
                        value={passwordData.currentPassword}
                        onChange={handlePasswordChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-200 focus:border-red-300 transition-colors"
                      />
                      <button
                        type="button"
                        onClick={handleCheckPassword}
                        className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                      >
                        Verify
                      </button>
                    </div>
                  </div>

                  {passwordVerified && (
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        New Password
                      </label>
                      <input
                        type="password"
                        name="newPassword"
                        value={passwordData.newPassword}
                        onChange={handlePasswordChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-200 focus:border-red-300 transition-colors"
                      />
                    </div>
                  )}

                  {passwordVerified && (
                    <button
                      type="submit"
                      className="w-full px-6 py-2 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 text-gray-900 rounded-lg hover:opacity-90 transition-opacity"
                    >
                      Change Password
                    </button>
                  )}
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SalonOwnerProfile;
