import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserCircle } from 'lucide-react';

function Navbar() {
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');

  const handleProfileClick = () => {
    if (userId && token) {
      navigate('/user-profile');
    } else {
      navigate('/signin');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <nav className="bg-white border-gray-200 shadow-md sticky top-0 z-50">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to="/" className="flex items-center z-50">
          <span className="self-center text-2xl font-semibold whitespace-nowrap">
            Beauty
          </span>
        </Link>

        <div className="flex items-center md:order-2 space-x-3 z-50">
          {userId && token ? (
            <div className="flex items-center space-x-4">
              <button
                onClick={handleProfileClick}
                className="text-gray-700 hover:text-gray-900 cursor-pointer relative z-50"
              >
                <UserCircle className="w-8 h-8" />
              </button>
              <button
                onClick={handleLogout}
                className="text-gray-700 hover:text-gray-900 text-sm"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/AdminOrUser')}
                className="text-gray-700 hover:text-gray-900 cursor-pointer relative z-50"
              >
                <UserCircle className="w-8 h-8" />
              </button>
              <button
                onClick={() => navigate('/AdminOrUser')}
                className="text-gray-700 hover:text-gray-900 text-sm"
              >
                Login
              </button>
            </div>
          )}
        </div>

        <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1 z-50">
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white">
            <li>
              <Link
                to="/"
                className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-red-300 md:p-0 cursor-pointer"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/Catalog"
                className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-red-300 md:p-0 cursor-pointer"
              >
                Catalog
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-red-300 md:p-0 cursor-pointer"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-red-300 md:p-0 cursor-pointer"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
