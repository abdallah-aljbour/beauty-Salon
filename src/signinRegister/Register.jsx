import { Link } from "react-router-dom";
function Register() {
  return (
    <>
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
                      type="submit"
                      class="flex w-full justify-center rounded-md border border-transparent bg-sky-400 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2"
                    >
                      Register Account
                    </button>
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
