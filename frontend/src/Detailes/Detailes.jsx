import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../Navbar";
import Name from "./NameR";
import Image from "./Images";
import Servies from "./Servies";
import Reviews from "./Reviews";
import AboutD from "./About";
import Footer from "../Footer";

function Details() {
  const [salon, setSalon] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSalonDetails = async () => {
      const id = window.location.pathname.split("/").pop(); // Get the ID from the URL
      try {
        const response = await axios.get(
          `http://localhost:3000/api/salons/${id}`
        );
        setSalon(response.data); // Set salon data to state
      } catch (error) {
        console.error("Failed to fetch salon data:", error);
        setError("Failed to fetch salon data");
      }
    };

    fetchSalonDetails();
  }, []);

  if (error) return <div>Error: {error}</div>;
  if (!salon) return <div>Loading...</div>; // Loading state

  return (
    <>
      <Navbar />
      <Name
        salonName={salon.owner.salonName}
        rating={3.5} // Static rating
        openingTime={salon.openingHours.monday.open}
        closingTime={salon.openingHours.monday.close}
        location={salon.city}
      />
      <Image images={salon.images} />
      <Servies services={salon.services} />
      <Reviews />
      <AboutD bio={salon.bio} />
      <Footer />
    </>
  );
}

export default Details;
