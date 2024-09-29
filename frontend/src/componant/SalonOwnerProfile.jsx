import React, { useState, useEffect } from "react";
import axios from "axios";
import DashboardLayout from "./DashboardLayout";

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

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        "http://localhost:3000/api/salon-ownerDahboord/profile",
        {
          headers: {
            "x-auth-token": token,
          },
        }
      );
      setProfile(res.data);
      setFormData({
        username: res.data.username,
        salonName: res.data.salonName,
      });
    } catch (err) {
      console.error("Error fetching profile:", err);
      setError("Failed to fetch profile. Please try again.");
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
      const res = await axios.put(
        "http://localhost:3000/api/salon-ownerDahboord/profile",
        formData,
        {
          headers: {
            "x-auth-token": token,
          },
        }
      );
      setProfile(res.data);
      setEditMode(false);
      setError("");
      fetchProfile();
    } catch (err) {
      console.error("Error updating profile:", err);
      setError(
        err.response?.data?.msg ||
          "An error occurred while updating the profile"
      );
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

  if (!profile) return <div>Loading...</div>;

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="px-6 py-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Salon Owner Profile
          </h2>
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}
          <table className="w-full mb-6">
            <tbody>
              <tr>
                <td className="font-semibold pr-4 py-2">Username:</td>
                <td>
                  {editMode ? (
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      className="border rounded px-2 py-1 w-full"
                    />
                  ) : (
                    profile.username
                  )}
                </td>
              </tr>
              <tr>
                <td className="font-semibold pr-4 py-2">Salon Name:</td>
                <td>
                  {editMode ? (
                    <input
                      type="text"
                      name="salonName"
                      value={formData.salonName}
                      onChange={handleChange}
                      className="border rounded px-2 py-1 w-full"
                    />
                  ) : (
                    profile.salonName
                  )}
                </td>
              </tr>
              <tr>
                <td className="font-semibold pr-4 py-2">Email:</td>
                <td>{profile.email}</td>
              </tr>
              <tr>
                <td className="font-semibold pr-4 py-2">Role:</td>
                <td>{profile.role}</td>
              </tr>
            </tbody>
          </table>
          {editMode && (
            <>
              <form onSubmit={handleSubmit} className="space-y-4 mb-8">
                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={exitEditMode}
                    className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
              <form onSubmit={handlePasswordSubmit} className="space-y-4">
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  Change Password
                </h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Current Password
                  </label>
                  <div className="flex space-x-2">
                    <input
                      type="password"
                      name="currentPassword"
                      value={passwordData.currentPassword}
                      onChange={handlePasswordChange}
                      className="mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    <button
                      type="button"
                      onClick={handleCheckPassword}
                      className="mt-1 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                      Verify
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    New Password
                  </label>
                  <input
                    type="password"
                    name="newPassword"
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                    className="mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <button
                    type="submit"
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Change Password
                  </button>
                </div>
              </form>
            </>
          )}
          {!editMode && (
            <button
              onClick={() => setEditMode(true)}
              className="mt-4 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SalonOwnerProfile;
