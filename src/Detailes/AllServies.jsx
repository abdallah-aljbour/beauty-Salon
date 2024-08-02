import Navbar from "../Navbar";
import { Link } from "react-router-dom";
function AllServies() {
  return (
    <>
      <Navbar />
      <h1 className="text-4xl font-bold m-8">Select services </h1>
      <div className="flex">
        <p className="m-8 font-bold">Featured</p>
        <p className="m-8 font-bold">Nails</p>
        <p className="m-8 font-bold">Eyebrows & eyelashes</p>
        <p className="m-8 font-bold">Hair & styling</p>
        <p className="m-8 font-bold">Body care</p>
      </div>
      <div className="grid grid-cols-3 grid-rows gap-5 m-8">
        <p className="border p-2 row-start-1 row-end-2 col-start-1 col-end-3">
          Pedicure
          <br />
          <span className=" opacity-30">45mins</span>
          <br /> <br />
          JOD 6
        </p>
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
        <div className="row-start-1 row-end-4 col-start-3 col-end-4 border sticky top-0 z-50">
          <p className="font-bold text-4xl p-5 ">Name Salon Like This</p>
          <div className="flex justify-between">
            <p className=" p-5  "> Nails</p>
            <p className=" p-5  "> 10$ </p>
          </div>

          <div className="border-t-2 mt-10">
            <Link to="/Detailes/paymentPage/payment">
              <button
                type="button"
                class="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 w-96 ml-9 mt-32 "
              >
                continue{" "}
              </button>{" "}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
export default AllServies;
