function Testimonial() {
  return (
    <div className="bg-white">
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h4 className="text-sm sm:text-base lg:text-lg font-bold tracking-wide uppercase text-teal-600 mb-2">
            Reviews
          </h4>
          <p className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-gray-900">
            We have some fans.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {/* Review Card 1 */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-lg border border-gray-100 transition-transform duration-300 hover:scale-105">
            <div className="flex items-start gap-4">
              <img
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full"
                src="https://randomuser.me/api/portraits/men/12.jpg"
                alt="Ravi Kumar"
                loading="lazy"
              />
              <div className="flex-1">
                <h6 className="text-base sm:text-lg font-medium text-gray-700">
                  Ravi Kumar
                </h6>
                <p className="text-sm text-gray-500">Car Enthusiast</p>
              </div>
            </div>
            <p className="mt-4 sm:mt-6 text-sm sm:text-base text-gray-600">
              The quality of service is outstanding. The staff is professional and the atmosphere is luxurious. Highly recommend!
            </p>
          </div>

          {/* Review Card 2 */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-lg border border-gray-100 transition-transform duration-300 hover:scale-105">
            <div className="flex items-start gap-4">
              <img
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full"
                src="https://randomuser.me/api/portraits/women/14.jpg"
                alt="Anjali Sharma"
                loading="lazy"
              />
              <div className="flex-1">
                <h6 className="text-base sm:text-lg font-medium text-gray-700">
                  Anjali Sharma
                </h6>
                <p className="text-sm text-gray-500">Marketing Professional</p>
              </div>
            </div>
            <p className="mt-4 sm:mt-6 text-sm sm:text-base text-gray-600">
              I love the variety of services! The staff is very attentive and the results are always amazing.
            </p>
          </div>

          {/* Review Card 3 */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-lg border border-gray-100 transition-transform duration-300 hover:scale-105">
            <div className="flex items-start gap-4">
              <img
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full"
                src="https://randomuser.me/api/portraits/men/18.jpg"
                alt="Vijay Singh"
                loading="lazy"
              />
              <div className="flex-1">
                <h6 className="text-base sm:text-lg font-medium text-gray-700">
                  Vijay Singh
                </h6>
                <p className="text-sm text-gray-500">Software Developer</p>
              </div>
            </div>
            <p className="mt-4 sm:mt-6 text-sm sm:text-base text-gray-600">
              The booking process is seamless, and the service quality is consistently excellent. Great experience every time!
            </p>
          </div>

          {/* Review Card 4 */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-lg border border-gray-100 transition-transform duration-300 hover:scale-105">
            <div className="flex items-start gap-4">
              <img
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full"
                src="https://randomuser.me/api/portraits/women/2.jpg"
                alt="Priya Patel"
                loading="lazy"
              />
              <div className="flex-1">
                <h6 className="text-base sm:text-lg font-medium text-gray-700">
                  Priya Patel
                </h6>
                <p className="text-sm text-gray-500">Mobile Developer</p>
              </div>
            </div>
            <p className="mt-4 sm:mt-6 text-sm sm:text-base text-gray-600">
              The staff is incredibly skilled and professional. I always leave feeling refreshed and beautiful.
            </p>
          </div>

          {/* Review Card 5 */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-lg border border-gray-100 transition-transform duration-300 hover:scale-105">
            <div className="flex items-start gap-4">
              <img
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full"
                src="https://randomuser.me/api/portraits/men/62.jpg"
                alt="Arjun Mehta"
                loading="lazy"
              />
              <div className="flex-1">
                <h6 className="text-base sm:text-lg font-medium text-gray-700">
                  Arjun Mehta
                </h6>
                <p className="text-sm text-gray-500">Manager</p>
              </div>
            </div>
            <p className="mt-4 sm:mt-6 text-sm sm:text-base text-gray-600">
              Great value for money. The services are top-notch and the ambiance is perfect for relaxation.
            </p>
          </div>

          {/* Review Card 6 */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-lg border border-gray-100 transition-transform duration-300 hover:scale-105">
            <div className="flex items-start gap-4">
              <img
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full"
                src="https://randomuser.me/api/portraits/women/19.jpg"
                alt="Sneha Rao"
                loading="lazy"
              />
              <div className="flex-1">
                <h6 className="text-base sm:text-lg font-medium text-gray-700">
                  Sneha Rao
                </h6>
                <p className="text-sm text-gray-500">Product Designer</p>
              </div>
            </div>
            <p className="mt-4 sm:mt-6 text-sm sm:text-base text-gray-600">
              Absolutely love this place! The attention to detail and customer service is exceptional.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Testimonial;
