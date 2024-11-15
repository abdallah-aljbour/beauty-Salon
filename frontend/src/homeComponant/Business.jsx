import { Link } from "react-router-dom";

function Business() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <p className="text-lg sm:text-xl lg:text-2xl italic font-black mb-6 sm:mb-8 lg:mb-10">
        For Business
      </p>
      
      {/* Desktop and Tablet Layout (2 columns) */}
      <div className="hidden sm:grid sm:grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 items-center">
        <div className="space-y-6 lg:space-y-8 p-4 sm:p-6 lg:p-8">
          <p className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight">
            Supercharge your business for free with the Jordan top booking
            platform for salons.<br /><br />
            Log in now and manage your site with ease
          </p>
          <Link to="/signinRegister/signin">
            <button
              type="button"
              className="w-full sm:w-auto text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 font-medium rounded-lg text-sm px-6 py-3 text-center"
            >
              Log in as admin
            </button>
          </Link>
        </div>
        <div className="relative h-[300px] sm:h-[400px] lg:h-[500px]">
          <img
            className="w-full h-full object-cover rounded-lg"
            src="https://i.pinimg.com/564x/86/1f/40/861f40338bc442eab6d996dd6b1822e9.jpg"
            alt="Business"
          />
        </div>
      </div>

      {/* Mobile Layout (stacked) */}
      <div className="sm:hidden flex flex-col gap-6">
        <div className="space-y-4 px-2">
          <p className="text-xl font-bold leading-tight">
            Supercharge your business for free with the Jordan top booking
            platform for salons.<br /><br />
            Log in now and manage your site with ease
          </p>
          <Link to="/signinRegister/signin">
            <button
              type="button"
              className="w-full text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 font-medium rounded-lg text-sm px-4 py-2.5 text-center"
            >
              Log in as admin
            </button>
          </Link>
        </div>
        <div className="relative h-[250px]">
          <img
            className="w-full h-full object-cover rounded-lg"
            src="https://i.pinimg.com/564x/86/1f/40/861f40338bc442eab6d996dd6b1822e9.jpg"
            alt="Business"
          />
        </div>
      </div>
    </div>
  );
}

export default Business;
