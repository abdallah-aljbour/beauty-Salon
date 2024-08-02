import { Link } from "react-router-dom";
function Servies() {
  return (
    <>
      <h1 className="m-8 font-bold text-2xl">Servies</h1>
      <div className="m-8 grid grid-cols-3 grid-rows gap-5">
        <p className="border p-2 row-start-1 row-end-2 col-start-1 col-end-3">
          Pedicure
          <br />
          <span className=" opacity-30">45mins</span>
          <br /> <br />
          JOD 6
        </p>
        <button className="row-start-1 row-end-2 col-start-2 col-end-3 ">
          Book
        </button>
        <p className="border p-2 row-start-2 row-end-3 col-start-1 col-end-3">
          Pedicure
          <br />
          <span className=" opacity-30">45mins</span>
          <br /> <br />
          JOD 6
        </p>
        <p className="border p-2 row-start-3 row-end-4 col-start-1 col-end-3">
          Manicure
          <br />
          <span className=" opacity-30">45mins</span>
          <br /> <br />
          JOD 6
        </p>
        <p className="border p-2 row-start-4 row-end-5 col-start-1 col-end-3">
          Eyebrow
          <br />
          <span className=" opacity-30">45mins</span>
          <br /> <br />
          JOD 3
        </p>
        <p className="border p-2 row-start-5 row-end-6 col-start-1 col-end-3">
          Gold backage
          <br />
          <span className=" opacity-30">45mins</span>
          <br /> <br />4 hrs, 5 mins • 6 services JOD 50{" "}
          <span className="text-green-600">Save 33%</span>
        </p>
        <div className="row-start-1 row-end-4 col-start-3 col-end-4 border sticky top-0 z-50">
          <p className="font-bold text-4xl p-5 ">Name Salon Like This</p>
          <p className="font-bold  p-5  "> Rating: 4.5</p>
          <button
            type="button"
            class="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 w-96 ml-5 "
          >
            Book Now{" "}
          </button>{" "}
          <div className="border-t-2 mt-10">
            <p className="mt-5">
              <span className="text-green-600 ml-4 ">Open </span> until 7:00 PM
            </p>
            <p className="ml-4 mt-5">
              Aqaba <br />
              <span className="text-blue-500 ">Get directions </span>
            </p>
          </div>
        </div>
      </div>

      <Link to="/Detailes/AllServies">
        <button
          type="button"
          className="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb- w-36 ml-8 "
        >
          See All{" "}
        </button>{" "}
      </Link>
    </>
  );
}
export default Servies;
