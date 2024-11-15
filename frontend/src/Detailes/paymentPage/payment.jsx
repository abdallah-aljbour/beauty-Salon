import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";

function PayMent() {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    selectedServices = [],
    selectedDate,
    selectedTime,
    salonId,
  } = location.state || {};

  const [paymentDetails, setPaymentDetails] = useState({
    fullName: "",
    cardNumber: "",
    expiration: "",
    cvv: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const stripePromise = loadStripe(
    "pk_test_51QFKzoRqSgLzqGdJWQWyg8e1Z7dujDtJbVx3TPVWVsy9MOR4KfQ6ztNWqjoVzA8hfYXHuAij1DvPQAp64sHnnW9900b3X6A6dI"
  );

  const calculateTotal = () => {
    return selectedServices
      .reduce((total, service) => total + service.price, 0)
      .toFixed(2);
  };

  const serviceFee = 0.99;
  const finalTotal = (parseFloat(calculateTotal()) + serviceFee).toFixed(2);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("token");
      
      if (!token) {
        setError("Please login to continue");
        navigate("/signin");
        return;
      }

      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      const userId = decodedToken.user.id;

      if (!paymentDetails.fullName.trim()) {
        setError("Full name is required");
        return;
      }

      if (!paymentDetails.cardNumber.trim()) {
        setError("Card number is required");
        return;
      }

      if (!paymentDetails.expiration.trim()) {
        setError("Expiration date is required");
        return;
      }

      if (!paymentDetails.cvv.trim()) {
        setError("CVV is required");
        return;
      }

      const bookingData = {
        userId,
        salonId,
        services: selectedServices.map((service) => ({
          serviceId: service._id || service.id,
          name: service.name,
          price: Number(service.price)
        })),
        appointmentDate: selectedDate,
        appointmentTime: selectedTime,
        totalAmount: Number(finalTotal),
        status: "pending",
        customer: {
          name: paymentDetails.fullName,
        },
        payment: {
          amount: Number(finalTotal),
          status: "pending",
          cardDetails: {
            last4: paymentDetails.cardNumber.slice(-4),
            expiryDate: paymentDetails.expiration
          }
        }
      };

      const response = await axios.post(
        "http://localhost:3000/api/bookings",
        bookingData,
        {
          headers: {
            "x-auth-token": token,
            "Content-Type": "application/json"
          },
        }
      );

      if (response.data.success) {
        const stripe = await stripePromise;
        const session = await axios.post(
          "http://localhost:3000/api/payments/create-session",
          {
            bookingId: response.data.booking._id,
            amount: parseFloat(finalTotal) * 100,
          },
          {
            headers: {
              "x-auth-token": token,
              "Content-Type": "application/json"
            },
          }
        );

        const result = await stripe.redirectToCheckout({ 
          sessionId: session.data.id 
        });

        if (result.error) {
          setError(result.error.message);
        }
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || "Failed to process booking";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6 sm:py-8 lg:py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1000px]">
        {/* Back Button */}
        <Link
          to="/DatePicker"
          state={{ selectedServices, salonId }}
          className="inline-flex items-center text-gray-600 hover:text-gray-800 mb-6"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
          <span className="text-sm sm:text-base">Back to Date Selection</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Payment Form Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 lg:p-8">
              <h2 className="text-xl sm:text-2xl font-bold mb-6">Payment Details</h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={paymentDetails.fullName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-200"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Card Number
                  </label>
                  <input
                    type="text"
                    name="cardNumber"
                    value={paymentDetails.cardNumber}
                    onChange={handleInputChange}
                    placeholder="1234 5678 9012 3456"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-200"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Expiration Date
                    </label>
                    <input
                      type="text"
                      name="expiration"
                      value={paymentDetails.expiration}
                      onChange={handleInputChange}
                      placeholder="MM/YY"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-200"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      CVV
                    </label>
                    <input
                      type="text"
                      name="cvv"
                      value={paymentDetails.cvv}
                      onChange={handleInputChange}
                      placeholder="123"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-200"
                      required
                    />
                  </div>
                </div>

                {error && (
                  <div className="bg-red-50 text-red-500 p-3 rounded-md text-sm">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-3 px-4 text-sm sm:text-base font-medium rounded-lg transition-colors
                    ${loading
                      ? "bg-gray-300 cursor-not-allowed"
                      : "text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl"
                    }`}
                >
                  {loading ? "Processing..." : `Pay JOD ${finalTotal}`}
                </button>
              </form>
            </div>
          </div>

          {/* Order Summary Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 lg:p-8">
              <h3 className="text-lg sm:text-xl font-bold mb-4">Order Summary</h3>
              
              <div className="space-y-3">
                {selectedServices.map((service, index) => (
                  <div key={index} className="flex justify-between text-sm sm:text-base">
                    <span>{service.name}</span>
                    <span>JOD {service.price.toFixed(2)}</span>
                  </div>
                ))}
                
                <div className="border-t pt-3 mt-3">
                  <div className="flex justify-between text-sm sm:text-base">
                    <span>Service Fee</span>
                    <span>JOD {serviceFee.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold mt-2 text-base sm:text-lg">
                    <span>Total</span>
                    <span>JOD {finalTotal}</span>
                  </div>
                </div>
              </div>

              {/* Appointment Details */}
              <div className="mt-6 pt-4 border-t">
                <h4 className="font-semibold mb-2 text-sm sm:text-base">Appointment Details</h4>
                <div className="space-y-2 text-sm sm:text-base">
                  <p>Date: {new Date(selectedDate).toLocaleDateString()}</p>
                  <p>Time: {selectedTime}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PayMent;
