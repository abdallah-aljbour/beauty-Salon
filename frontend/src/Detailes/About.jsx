import React from "react";
import { Link } from "react-router-dom";

function AboutD({ bio, location, openingHours, salonName, rating, city, salonId }) {
  const googleMapsUrl = location?.coordinates
    ? `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3000!2d${location.coordinates[0]}!3d${location.coordinates[1]}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zM!5e0!3m2!1sen!2sus!4v1600000000000!5m2!1sen!2sus`
    : "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3471.528025898094!2d35.0037932246183!3d29.530113475186628!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x150070366ddcf20d%3A0x92f8776b678e59bd!2sAqaba%20Gateway!5e0!3m2!1sar!2sjo!4v1722096949650!5m2!1sar!2sjo";

  const days = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];

  const formatTime = (time) => {
    if (!time) return "Closed";
    return time;
  };

  const getCurrentDayClosingTime = () => {
    const today = days[new Date().getDay()];
    return openingHours?.[today]?.close || "N/A";
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-6">About</h1>
      
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Main Content */}
        <div className="w-full lg:w-2/3 space-y-6">
          {/* Bio Section */}
          <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
            <p className="text-sm sm:text-base text-gray-600">
              {bio || "No description available"}
            </p>
          </div>

          {/* Map Section */}
          <div className="aspect-video w-full rounded-lg overflow-hidden shadow-sm">
            <iframe
              className="w-full h-full"
              src={googleMapsUrl}
              title="Salon Location"
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>

          {/* Opening Hours Section - Visible on mobile and tablet */}
          <div className="lg:hidden bg-white rounded-lg shadow-sm p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold mb-4">Opening Hours</h2>
            <div className="space-y-3">
              {days.map((day) => (
                <div key={day} className="flex justify-between items-center">
                  <span className="capitalize text-sm sm:text-base">{day}</span>
                  <span className="text-sm sm:text-base">
                    {openingHours?.[day]?.isOpen
                      ? `${formatTime(openingHours[day].open)} - ${formatTime(openingHours[day].close)}`
                      : "Closed"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-full lg:w-1/3">
          <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 lg:sticky lg:top-20">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">{salonName || "Salon Name"}</h2>
            <p className="text-base sm:text-lg font-semibold mb-6">Rating: {rating || "N/A"}</p>

            <Link to={`/AllServices/${salonId}`}>
              <button
                type="button"
                className="w-full py-3 text-sm sm:text-base font-medium text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 rounded-lg hover:opacity-90 transition-colors mb-6"
              >
                Book Now
              </button>
            </Link>

            <div className="border-t pt-4">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-sm sm:text-base text-green-600 font-medium">Open</span>
                <span className="text-sm sm:text-base text-gray-600">until {getCurrentDayClosingTime()}</span>
              </div>
              <p className="text-sm sm:text-base text-gray-600">
                {city || "Location not available"}
                <button 
                  className="block text-blue-600 hover:text-blue-800 transition-colors mt-1"
                  onClick={() => window.open(`https://www.google.com/maps/search/${encodeURIComponent(city)}`)}
                >
                  Get directions
                </button>
              </p>
            </div>

            {/* Opening Hours - Desktop Only */}
            <div className="hidden lg:block border-t mt-6 pt-4">
              <h3 className="text-lg font-semibold mb-4">Opening Hours</h3>
              <div className="space-y-3">
                {days.map((day) => (
                  <div key={day} className="flex justify-between items-center">
                    <span className="capitalize text-sm">{day}</span>
                    <span className="text-sm">
                      {openingHours?.[day]?.isOpen
                        ? `${formatTime(openingHours[day].open)} - ${formatTime(openingHours[day].close)}`
                        : "Closed"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutD;
