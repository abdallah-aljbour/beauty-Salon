import { Link } from "react-router-dom";
function AdminOrUser() {
  return (
    <>
      <Link to="/signin">
        <button
          type="button"
          class="bg-white text-center w-48 rounded-2xl h-14 relative font-sans text-black text-xl font-semibold group col-start-1 col-end-3"
        >
          <div class="bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 rounded-xl h-12 w-1/4 flex items-center justify-center absolute left-1 top-[4px] group-hover:w-[184px] z-10 duration-500">
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
          <p class="translate-x-2">Go Back</p>
        </button>
      </Link>
      <div className="grid grid-rows-2 grid-cols-2 ">
        <div className="row-start-1 row-end-3 col-start-1 col-end-2">
          <Link to="/registerCustomer">
            <p className="mt-48 border p-2 w-96 h-16 flex justify-center items-center ml-52">
              For everyone
              <br /> Book Salon near you
            </p>
          </Link>
          <br />
          <Link to="/SalonOwnerRegister">
            <p className=" border p-2 w-96 h-16 flex justify-center items-center ml-52 ">
              For Business <br /> Manage and grow your business
            </p>
          </Link>
        </div>
        <div className="row-start-1 row-end-3 col-start-2 col-end-3">
          <img
            className=""
            src="https://i.pinimg.com/736x/a1/a6/d8/a1a6d8dcea0ac96c66d86388b73ca278.jpg"
          />
        </div>
      </div>
    </>
  );
}
export default AdminOrUser;
