function Hero() {
  return (
    <div className="bg-white">
      <div className="relative isolate px-6 pt-14 lg:px-8 h-[500px]">
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          ></div>
        </div>

        <div className="mx-auto max-w-4xl py-32 sm:py-48 lg:pt-10">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl mb-8">
              Book local beauty and wellness services
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Find and book beauty services in your area. Get pampered today!
            </p>

            <div className="max-w-2xl mx-auto">
              <form className="flex gap-2 p-2 bg-white rounded-lg shadow-lg">
                <div className="flex-1">
                  <input
                    type="search"
                    className="w-full p-4 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-200 focus:ring-red-200 focus:border-red-200"
                    placeholder="Search for salons, services, or locations..."
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="px-8 text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 font-medium rounded-lg text-sm"
                >
                  Search
                </button>
              </form>

              <div className="mt-4 flex flex-wrap justify-center gap-2">
                <span className="text-sm text-gray-500">Popular:</span>
                <button className="text-sm text-gray-600 hover:text-red-400">Hair Salon</button>
                <span className="text-gray-400">•</span>
                <button className="text-sm text-gray-600 hover:text-red-400">Nail Care</button>
                <span className="text-gray-400">•</span>
                <button className="text-sm text-gray-600 hover:text-red-400">Massage</button>
                <span className="text-gray-400">•</span>
                <button className="text-sm text-gray-600 hover:text-red-400">Facial</button>
              </div>
            </div>
          </div>
        </div>

        <div
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
