import "./buttonbook.css";
import Navbar from "../Navbar";
function AllServies() {
  return (
    <>
      <Navbar />
      <h1 className="text-4xl font-bold m-8">Select services</h1>
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
          <p className="font-bold text-xl p-5 ">Name Salon Like This</p>
          <div className="flex">
            <p className="font-bold  p-5 ">Manicure</p>
            <p className=" ml-64 mt-5">6 JOD</p>
          </div>
          <div className="border-t-2">
            <div className="flex">
              <p className="mt-5 ml-4 font-bold">Title</p>
              <p className="mt-5 ml-80 font-bold">6 JOD</p>
            </div>
            <button className="btn mt-28">
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
              <span class="text ">Continue</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default AllServies;
