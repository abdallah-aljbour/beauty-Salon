import Navbar from "../../Navbar";
import { Link } from "react-router-dom";
function BookForMe() {
  return (
    <>
      <Navbar />
      <div className="mt-48">
        <div className="flex justify-center ml-72 mt-24">
          <p className="font-bold text-2xl">تحديد خيار</p>
        </div>
        <div className="flex justify-center ml-80 mt-5">
          <p className="font-bold text-lg">حجز</p>
        </div>
        <div className="flex justify-center  mt-6 ">
          <Link to="/Detailes/AllServies">
            <button
              type="button"
              class="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 w-96"
            >
              حجز لنفسك{" "}
            </button>{" "}
          </Link>
        </div>
        <div className="flex justify-center  mt-6 ">
          <Link to="/Detailes/AllServies">
            <button
              type="button"
              class="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 w-96"
            >
              حجز لنفسك ولاخرين{" "}
            </button>{" "}
          </Link>
        </div>
      </div>
    </>
  );
}
export default BookForMe;
