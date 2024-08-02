import { Link } from "react-router-dom";

function DatePicker() {
  return (
    <>
      <Link to="/Detailes/AllServies">
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
      <div className="flex items-center justify-center  bg-gray-100 mt">
        <div className="relative ">
          <input
            type="text"
            placeholder="Select a date"
            className="block w-full px-4 py-2 mt-1 text-sm text-zinc-900 placeholder-zinc-500 bg-white border border-zinc-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
          />
          <div className="absolute top-12 left-1/2 transform -translate-x-1/2 z-10 bg-white border border-zinc-300 rounded-lg shadow-lg mt-24">
            <div className="flex justify-between px-4 py-2 bg-primary h-56 w-96">
              <button className="text-primary-foreground">&lt;</button>
              <span className="text-primary-foreground">August 2023</span>
              <button className="text-primary-foreground">&gt;</button>
            </div>
            <div className="grid grid-cols-7 gap-1 p-2">
              <span className="text-center text-primary-foreground cursor-pointer">
                Sun
              </span>
              <span className="text-center text-primary-foreground cursor-pointer">
                Mon
              </span>
              <span className="text-center text-primary-foreground cursor-pointer">
                Tue
              </span>
              <span className="text-center text-primary-foreground cursor-pointer">
                Wed
              </span>
              <span className="text-center text-primary-foreground cursor-pointer">
                Thu
              </span>
              <span className="text-center text-primary-foreground cursor-pointer">
                Fri
              </span>
              <span className="text-center text-primary-foreground cursor-pointer">
                Sat
              </span>

              <span className="text-center text-primary-foreground cursor-pointer">
                1
              </span>
              <span className="text-center text-primary-foreground cursor-pointer">
                2
              </span>
              <span className="text-center text-primary-foreground cursor-pointer">
                3
              </span>
              <span className="text-center text-primary-foreground cursor-pointer">
                4
              </span>
              <span className="text-center text-primary-foreground cursor-pointer">
                5
              </span>
              <span className="text-center text-primary-foreground cursor-pointer">
                6
              </span>
              <span className="text-center text-primary-foreground cursor-pointer">
                7
              </span>
              <span className="text-center text-primary-foreground cursor-pointer">
                8
              </span>
              <span className="text-center text-primary-foreground cursor-pointer">
                9
              </span>
              <span className="text-center text-primary-foreground cursor-pointer">
                10
              </span>
              <span className="text-center text-primary-foreground cursor-pointer">
                11
              </span>
              <span className="text-center text-primary-foreground cursor-pointer">
                12
              </span>
              <span className="text-center text-primary-foreground cursor-pointer">
                13
              </span>
              <span className="text-center text-primary-foreground cursor-pointer">
                14
              </span>
              <span className="text-center text-primary-foreground cursor-pointer">
                15
              </span>
              <span className="text-center text-primary-foreground cursor-pointer">
                16
              </span>
              <span className="text-center text-primary-foreground cursor-pointer">
                17
              </span>
              <span className="text-center text-primary-foreground cursor-pointer">
                18
              </span>
              <span className="text-center text-primary-foreground cursor-pointer">
                19
              </span>
              <span className="text-center text-primary-foreground cursor-pointer">
                20
              </span>
              <span className="text-center text-primary-foreground cursor-pointer">
                21
              </span>
              <span className="text-center text-primary-foreground cursor-pointer">
                22
              </span>
              <span className="text-center text-primary-foreground cursor-pointer">
                23
              </span>
              <span className="text-center text-primary-foreground cursor-pointer">
                24
              </span>
              <span className="text-center text-primary-foreground cursor-pointer">
                25
              </span>
              <span className="text-center text-primary-foreground cursor-pointer">
                26
              </span>
              <span className="text-center text-primary-foreground cursor-pointer">
                27
              </span>
              <span className="text-center text-primary-foreground cursor-pointer">
                28
              </span>
              <span className="text-center text-primary-foreground cursor-pointer">
                29
              </span>
              <span className="text-center text-primary-foreground cursor-pointer">
                30
              </span>
              <span className="text-center text-primary-foreground cursor-pointer">
                31
              </span>
            </div>
            <Link to="/Detailes/paymentPage/payment">
              <button
                type="button"
                className="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb- w-36 ml-32 mt-5 mb-5"
              >
                continuation{" "}
              </button>{" "}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
export default DatePicker;
