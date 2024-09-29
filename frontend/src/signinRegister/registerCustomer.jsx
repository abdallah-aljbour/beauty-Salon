import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function RegisterCustomer() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setSuccess(""); // Clear success message
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/user/register",
        formData
      );
      const { role } = response.data;
      // Store role in localStorage
      localStorage.setItem("role", role);

      setSuccess(response.data.message); // Set success message
      setError(""); // Clear error message
      setFormData({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      }); // Clear form data
    } catch (error) {
      // Extract detailed error message from the response
      const errorMessage = error.response
        ? error.response.data.message
        : "Registration failed";
      setError(errorMessage);
      setSuccess(""); // Clear success message
    }
  };

  return (
    <>
      <Link to="/AdminOrUser">
        <button
          type="button"
          className="bg-white text-center w-48 rounded-2xl h-14 relative font-sans text-black text-xl font-semibold group"
        >
          <div className="bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 rounded-xl h-12 w-1/4 flex items-center justify-center absolute left-1 top-[4px] group-hover:w-[184px] z-10 duration-500">
            <svg
              width="25px"
              height="25px"
              viewBox="0 0 1024 1024"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="#000000"
                d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"
              ></path>
              <path
                fill="#000000"
                d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"
              ></path>
            </svg>
          </div>
          <p className="translate-x-2">Go Back</p>
        </button>
      </Link>

      <div className="grid grid-cols-2 grid-rows-2 border">
        <div className="row-start-1 row-end-3 col-start-1 col-end-2 ml-9">
          <div className="bg-gray-50 flex h-screen items-center justify-center px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
              <div className="bg-white shadow-md rounded-md p-6">
                <img
                  className="mx-auto h-12 w-auto"
                  src="https://www.svgrepo.com/show/499664/user-happy.svg"
                  alt="User Icon"
                />

                <h2 className="my-3 text-center text-3xl font-bold tracking-tight text-gray-900">
                  Sign up for an account
                </h2>

                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div>
                    <label
                      htmlFor="username"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Username
                    </label>
                    <div className="mt-1">
                      <input
                        name="username"
                        type="text"
                        value={formData.username}
                        onChange={handleChange}
                        required
                        className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email
                    </label>
                    <div className="mt-1">
                      <input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Password
                    </label>
                    <div className="mt-1">
                      <input
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="confirmPassword"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Confirm Password
                    </label>
                    <div className="mt-1">
                      <input
                        name="confirmPassword"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                        className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  {error && (
                    <div className="text-red-500 text-sm mt-2">{error}</div>
                  )}

                  {success && (
                    <div className="text-green-500 text-sm mt-2">{success}</div>
                  )}

                  <div>
                    <button
                      type="submit"
                      className="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-bold rounded-lg text-sm px-5 py-2.5 text-center mb-2 w-96"
                    >
                      Register Account
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="col-start-2 col-end-3">
          <img
            className="row-start-1 row-end-3 col-start-2 col-end-3 mt-9 mr-9 flex"
            src="https://img.freepik.com/premium-photo/beauty-salon-with-service-desk-very-well-lit_943281-39181.jpg"
            alt="Salon"
          />
        </div>
      </div>
    </>
  );
}

export default RegisterCustomer;
