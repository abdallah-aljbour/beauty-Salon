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
    <>
      <h1 className="font-bold text-xl ml-8">About</h1>
      <div className="m-8 grid grid-cols-3 grid-rows gap-5">
        <div className="row-start-1 row-end-2 col-start-1 col-end-3">
          <p>{bio || "No description available"}</p>
          <br />
          <iframe
            className="row-start-1 row-end-2 col-start-1 col-end-3"
            width="100%"
            height="500rem"
            src={googleMapsUrl}
            title="Salon Location"
          ></iframe>
        </div>

        <div className="row-start-1 row-end-4 col-start-3 col-end-4 border sticky top-0 z-50">
          <p className="font-bold text-4xl p-5">{salonName || "Salon Name"}</p>
          <p className="font-bold p-5">Rating: {rating || "N/A"}</p>
          <Link to={`/AllServices/${salonId}`}>
            <button
              type="button"
              className="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center w-96 ml-5"
            >
              Book Now
            </button>
          </Link>
          <div className="border-t-2 mt-10 p-4">
            <p>
              <span className="text-green-600">Open</span> until{" "}
              {getCurrentDayClosingTime()}
            </p>
            <p className="mt-4">
              {city || "Location not available"}
              <br />
              <span className="text-blue-500">Get directions</span>
            </p>
          </div>
        </div>

        <div className="grid cols-3 grid-rows gap-5">
          <h1 className="font-bold text-xl">Opening Time</h1>
          {days.map((day, index) => (
            <React.Fragment key={day}>
              <p
                className={`row-start-${index + 2} row-end-${
                  index + 3
                } col-start-1 col-end-2`}
              >
                {day.charAt(0).toUpperCase() + day.slice(1)}
              </p>
              <span
                className={`row-start-${index + 2} row-end-${
                  index + 3
                } col-start-2 col-end-3`}
              >
                {openingHours?.[day]?.isOpen
                  ? `${formatTime(openingHours[day].open)} - ${formatTime(
                      openingHours[day].close
                    )}`
                  : "Closed"}
              </span>
            </React.Fragment>
          ))}
        </div>
      </div>
    </>
  );
}

export default AboutD;
