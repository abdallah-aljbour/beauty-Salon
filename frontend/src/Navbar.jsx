import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserCircle, Menu, X } from 'lucide-react';

function Navbar() {
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white border-gray-200 shadow-md sticky top-0 z-50">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to="/" className="flex items-center">
          <span className="self-center text-2xl font-semibold whitespace-nowrap">
            Beauty
          </span>
        </Link>

        {/* Mobile menu button */}
        <button
          onClick={toggleMenu}
          className="md:hidden inline-flex items-center p-2 w-10 h-10 justify-center text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        <div className="flex items-center md:order-2">
          {userId && token ? (
            <div className="flex items-center space-x-4">
              <button
                onClick={handleProfileClick}
                className="text-gray-700 hover:text-gray-900 cursor-pointer"
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
                className="text-gray-700 hover:text-gray-900 cursor-pointer"
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

        {/* Navigation Links */}
        <div
          className={`${
            isMenuOpen ? 'block' : 'hidden'
          } w-full md:block md:w-auto md:order-1`}
        >
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white">
            <li>
              <Link
                to="/"
                onClick={() => setIsMenuOpen(false)}
                className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-red-300 md:p-0"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/Catalog"
                onClick={() => setIsMenuOpen(false)}
                className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-red-300 md:p-0"
              >
                Catalog
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                onClick={() => setIsMenuOpen(false)}
                className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-red-300 md:p-0"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                onClick={() => setIsMenuOpen(false)}
                className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-red-300 md:p-0"
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
