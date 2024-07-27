import "./buttonbook.css";
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
          <p className="font-bold  p-5  ">Rating : 4.5</p>
          <button className="btn mb-10">
            <span class="icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="24"
                fill="currentColor"
                class="bi bi-airplane-fill"
                viewBox="0 0 16 16"
              >
                <path d="M6.428 1.151C6.708.591 7.213 0 8 0s1.292.592 1.572 1.151C9.861 1.73 10 2.431 10 3v3.691l5.17 2.585a1.5 1.5 0 0 1 .83 1.342V12a.5.5 0 0 1-.582.493l-5.507-.918-.375 2.253 1.318 1.318A.5.5 0 0 1 10.5 16h-5a.5.5 0 0 1-.354-.854l1.319-1.318-.376-2.253-5.507.918A.5.5 0 0 1 0 12v-1.382a1.5 1.5 0 0 1 .83-1.342L6 6.691V3c0-.568.14-1.271.428-1.849Z"></path>
              </svg>
            </span>
            <span class="text">Book Now</span>
          </button>
          <div className="border-t-2">
            <p className="mt-5">
              <span className="text-green-600 ml-5 ">Open </span> until 8:00 PM{" "}
            </p>
            <p className="ml-5 mt-8">
              Aqaba Gateway, Aqaba, Aqaba Governorate <br />
              <span className="text-blue-500">Get directions</span>
            </p>
          </div>
        </div>
      </div>

      <Link to="/Detailes/AllServies">
        <button className="ml-8 border border-solid rounded-lg p-2 font-bold">
          See All
        </button>
      </Link>
    </>
  );
}
export default Servies;
