import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { UserCircle, CalendarDays, Briefcase, Home, ChevronRight, LogOut } from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    {
      path: "/SalonOwnerProfile",
      name: "Profile",
      icon: UserCircle
    },
    {
      path: "/OpeningHoursEditor",
      name: "Opening Hours",
      icon: CalendarDays
    },
    {
      path: "/admin-dashboard",
      name: "Create Salon Profile",
      icon: Briefcase
    },
    {
      path: "/ServiceCards",
      name: "Services",
      icon: Briefcase
    },
    {
      path: "/",
      name: "Home",
      icon: Home
    }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div 
      className={`${
        isCollapsed ? 'w-20' : 'w-64'
      } transition-all duration-300 ease-in-out h-screen bg-white shadow-lg relative`}
    >
      {/* Toggle Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-9 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 rounded-full p-1 shadow-md hover:shadow-lg transition-all duration-200"
      >
        <ChevronRight className={`h-4 w-4 transition-transform duration-200 ${isCollapsed ? 'rotate-180' : ''}`} />
      </button>

      {/* Header */}
      <div className="h-20 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 flex items-center justify-center">
        <h1 className={`text-gray-800 font-bold transition-all duration-300 ${isCollapsed ? 'text-sm' : 'text-xl'}`}>
          {isCollapsed ? 'DS' : 'Dashboard'}
        </h1>
      </div>

      {/* Navigation */}
      <nav className="mt-8">
        <ul className="space-y-2 px-4">
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`flex items-center px-4 py-3 rounded-lg transition-all duration-200 group
                  ${isActive(item.path)
                    ? 'bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 text-gray-900 shadow-md'
                    : 'text-gray-600 hover:bg-red-50'
                  }`}
              >
                <item.icon className={`${isCollapsed ? 'w-6 h-6' : 'w-5 h-5'} transition-all duration-200`} />
                {!isCollapsed && (
                  <span className="ml-3 text-sm font-medium">{item.name}</span>
                )}
                {isCollapsed && (
                  <div className="absolute left-20 bg-gray-800 text-white px-2 py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    {item.name}
                  </div>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Logout Button */}
      <div className="absolute bottom-8 w-full px-4">
        <button
          onClick={() => {
            localStorage.removeItem('token');
            window.location.href = '/signin';
          }}
          className={`flex items-center w-full px-4 py-3 text-gray-600 hover:text-red-500 transition-colors duration-200
            ${isCollapsed ? 'justify-center' : 'justify-start'}`}
        >
          <LogOut className={`${isCollapsed ? 'w-6 h-6' : 'w-5 h-5'}`} />
          {!isCollapsed && <span className="ml-3 text-sm font-medium">Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
