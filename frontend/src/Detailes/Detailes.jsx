import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../Navbar";
import Name from "./NameR";
import Image from "./Images";
import Servies from "./Servies";
import Reviews from "./Reviews";
import AboutD from "./About";
import Footer from "../Footer";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

function Details() {
  const [salon, setSalon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchSalonDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:3000/api/salons/${id}`
        );
        console.log("Fetched salon details:", response.data); // For debugging
        setSalon(response.data);
        setError(null);
      } catch (error) {
        console.error("Failed to fetch salon data:", error);
        setError("Failed to fetch salon data");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchSalonDetails();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
 
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-300"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500 text-center">
          <p className="text-xl font-semibold">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 text-white bg-red-400 hover:bg-red-500 px-4 py-2 rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!salon) return null;

  return (
    <>
      <Navbar />
      <Name
        salonName={salon.salonName}
        rating={3.5}
        openingTime={salon.openingHours?.monday?.open}
        closingTime={salon.openingHours?.monday?.close}
        location={salon.city}
      />
      <Image images={salon.images} />
      <Servies
        services={salon.services}
        salonName={salon.salonName}
        rating={3.5}
        closingTime={salon.openingHours?.monday?.close}
        location={salon.city}
      />
      <Reviews />
      <AboutD
        bio={salon.bio}
        location={salon.location}
        openingHours={salon.openingHours}
        salonName={salon.salonName}
        rating={3.5}
        city={salon.city}
        salonId={id}
      />
      <Footer />
    </>
  );
}

export default Details;
