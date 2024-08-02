import { Link } from "react-router-dom";
function Register() {
  return (
    <>
      <Link to="/signinRegister/signin">
        <button
          type="button"
          class="bg-white text-center w-48 rounded-2xl h-14 relative font-sans text-black text-xl font-semibold group"
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

      <div className="grid grid-cols-2 grid-rows-2 border">
        <div className=" row-start-1 row-end-3 col-start-1 col-end-2 ml-9">
          <div class="bg-gray-50 flex h-screen items-center justify-center px-4 sm:px-6 lg:px-8">
            <div class="w-full max-w-md space-y-8">
              <div class="bg-white shadow-md rounded-md p-6">
                <img
                  class="mx-auto h-12 w-auto"
                  src="https://www.svgrepo.com/show/499664/user-happy.svg"
                  alt=""
                />

                <h2 class="my-3 text-center text-3xl font-bold tracking-tight text-gray-900">
                  Sign up for an account
                </h2>

                <form class="space-y-6" method="POST">
                  <div>
                    <label
                      for="new-password"
                      class="block text-sm font-medium text-gray-700"
                    >
                      Username
                    </label>
                    <div class="mt-1">
                      <input
                        name="username"
                        type="username"
                        required
                        class="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      for="password"
                      class="block text-sm font-medium text-gray-700"
                    >
                      Email
                    </label>
                    <div class="mt-1">
                      <input
                        name="email"
                        type="email-address"
                        autocomplete="email-address"
                        required
                        class="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      for="password"
                      class="block text-sm font-medium text-gray-700"
                    >
                      Password
                    </label>
                    <div class="mt-1">
                      <input
                        name="password"
                        type="password"
                        autocomplete="password"
                        required
                        class="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      for="password"
                      class="block text-sm font-medium text-gray-700"
                    >
                      Confirm Password
                    </label>
                    <div class="mt-1">
                      <input
                        name="confirm_password"
                        type="password"
                        autocomplete="confirm-password"
                        required
                        class="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <button
                      type="button"
                      class="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-bold rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 w-96 mr-5 "
                    >
                      Register Account{" "}
                    </button>{" "}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="col-start-2 col-end-3">
          <img
            className="row-start-1 row-end-3 col-start-2 col-end-3   mt-9 mr-9 flex"
            src="https://img.freepik.com/premium-photo/beauty-salon-with-service-desk-very-well-lit_943281-39181.jpg"
          />
        </div>
      </div>
    </>
  );
}
export default Register;
