import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function PayMent() {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedServices = [], selectedDate, selectedTime, salonId } = location.state || {};
  const [paymentDetails, setPaymentDetails] = useState({
    fullName: "",
    cardNumber: "",
    expiration: "",
    cvv: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Calculate total price
  const calculateTotal = () => {
    return selectedServices.reduce((total, service) => total + service.price, 0).toFixed(2);
  };

  const serviceFee = 0.99;
  const finalTotal = (parseFloat(calculateTotal()) + serviceFee).toFixed(2);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const userId = localStorage.getItem('userId');
      const token = localStorage.getItem('token');

      if (!userId || !token) {
        navigate('/signin');
        return;
      }

      const bookingData = {
        userId,
        salonId,
        services: selectedServices.map(service => ({
          serviceId: service._id,
          name: service.name,
          price: service.price
        })),
        appointmentDate: selectedDate,
        appointmentTime: selectedTime,
        totalAmount: parseFloat(finalTotal),
        paymentDetails: {
          cardHolderName: paymentDetails.fullName,
          cardNumber: paymentDetails.cardNumber.slice(-4)
        }
      };

      console.log('Sending booking data:', bookingData); // Debug log

      const response = await axios.post(
        'http://localhost:3000/api/bookings',
        bookingData,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      if (response.data.success) {
        navigate('/booking-success', { 
          state: { 
            bookingId: response.data.booking._id,
            appointmentDate: selectedDate,
            appointmentTime: selectedTime,
            services: selectedServices
          },
          replace: true
        });
      }
    } catch (err) {
      console.error('Payment error:', err);
      setError(err.response?.data?.message || 'Failed to process booking. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Link to="/DatePicker" state={{ selectedServices, salonId }}>
        <button
          type="button"
          className="bg-white text-center w-48 rounded-2xl h-14 relative font-sans text-black text-xl font-semibold group m-4"
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

      <section className="bg-gray-100 py-8 md:py-16">
        <div className="mx-auto max-w-screen-xl px-4">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-2xl font-semibold text-gray-900 mb-8">
              Complete Your Payment
            </h2>

            <div className="lg:flex lg:items-start lg:gap-12">
              {/* Payment Form */}
              <form onSubmit={handleSubmit} className="w-full rounded-lg border border-gray-200 p-4 shadow-sm bg-white sm:p-6 lg:max-w-xl lg:p-8">
                <div className="mb-6 grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="mb-2 block text-sm font-medium text-gray-900">
                      Full name (as displayed on card)*
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={paymentDetails.fullName}
                      onChange={handleInputChange}
                      className="block w-full rounded-lg border border-gray-300 p-2.5 text-sm focus:border-red-200 focus:ring-red-200"
                      placeholder="John Doe"
                      required
                    />
                  </div>

                  <div className="col-span-2">
                    <label className="mb-2 block text-sm font-medium text-gray-900">
                      Card number*
                    </label>
                    <input
                      type="text"
                      name="cardNumber"
                      value={paymentDetails.cardNumber}
                      onChange={handleInputChange}
                      className="block w-full rounded-lg border border-gray-300 p-2.5 text-sm focus:border-red-200 focus:ring-red-200"
                      placeholder="1234 5678 9012 3456"
                      required
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-900">
                      Expiration date*
                    </label>
                    <input
                      type="text"
                      name="expiration"
                      value={paymentDetails.expiration}
                      onChange={handleInputChange}
                      className="block w-full rounded-lg border border-gray-300 p-2.5 text-sm focus:border-red-200 focus:ring-red-200"
                      placeholder="MM/YY"
                      required
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-900">
                      CVV*
                    </label>
                    <input
                      type="text"
                      name="cvv"
                      value={paymentDetails.cvv}
                      onChange={handleInputChange}
                      className="block w-full rounded-lg border border-gray-300 p-2.5 text-sm focus:border-red-200 focus:ring-red-200"
                      placeholder="123"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 w-full rounded-lg px-5 py-2.5 text-center text-sm font-medium"
                >
                  {loading ? 'Processing...' : 'Complete Booking'}
                </button>
              </form>

              {/* Order Summary */}
              <div className="mt-8 lg:mt-0 lg:w-96">
                <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                  <h3 className="text-lg font-semibold mb-4">Booking Summary</h3>

                  {/* Date and Time */}
                  <div className="mb-4 pb-4 border-b">
                    <p className="text-sm text-gray-600">Appointment Date:</p>
                    <p className="font-medium">{new Date(selectedDate).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}</p>
                    <p className="text-sm text-gray-600 mt-2">Time:</p>
                    <p className="font-medium">{selectedTime}</p>
                  </div>

                  {/* Services */}
                  <div className="space-y-3">
                    {selectedServices.map((service, index) => (
                      <div key={index} className="flex justify-between">
                        <span>{service.name}</span>
                        <span>JOD {service.price}</span>
                      </div>
                    ))}
                  </div>

                  {/* Totals */}
                  <div className="mt-4 border-t pt-4">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>JOD {calculateTotal()}</span>
                    </div>
                    <div className="flex justify-between mt-2">
                      <span>Service Fee</span>
                      <span>JOD {serviceFee}</span>
                    </div>
                    <div className="flex justify-between mt-2 font-bold">
                      <span>Total</span>
                      <span>JOD {finalTotal}</span>
                    </div>
                  </div>
                </div>

                {/* Payment Methods */}
                <div className="mt-6 flex justify-center space-x-4">
                  <img src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/visa.svg" alt="Visa" className="h-8" />
                  <img src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/mastercard.svg" alt="Mastercard" className="h-8" />
                  <img src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/paypal.svg" alt="PayPal" className="h-8" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
          {error}
        </div>
      )}
    </>
  );
}

export default PayMent;
