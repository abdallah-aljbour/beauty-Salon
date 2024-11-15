function Name({ salonName, rating, openingTime, closingTime, location }) {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
      <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 lg:p-8">
        {/* Salon Name */}
        <h1 className="text-xl sm:text-2xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
          {salonName}
        </h1>

        {/* Info Section */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
          {/* Rating */}
          <div className="flex items-center">
            <span className="text-sm sm:text-base font-semibold text-gray-900">
              Rating {rating}
            </span>
          </div>

          {/* Divider - Hidden on mobile */}
          <span className="hidden sm:inline text-gray-400">•</span>

          {/* Opening Hours */}
          <div className="flex items-center">
            <span className="text-sm sm:text-base text-green-600 font-medium">
              Open
            </span>
            <span className="text-sm sm:text-base text-gray-600 ml-1">
              until {closingTime}
            </span>
          </div>

          {/* Divider - Hidden on mobile */}
          <span className="hidden sm:inline text-gray-400">•</span>

          {/* Location */}
          <div className="flex items-center flex-wrap">
            <span className="text-sm sm:text-base text-gray-600">
              {location}
            </span>
            <button 
              className="text-sm sm:text-base text-blue-600 hover:text-blue-800 transition-colors ml-2"
              onClick={() => window.open(`https://www.google.com/maps/search/${encodeURIComponent(location)}`)}
            >
              Get directions
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Name;
