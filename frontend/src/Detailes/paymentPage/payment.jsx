import { Link } from "react-router-dom";
function PayMent() {
  return (
    <>
      <Link to="/Detailes/paymentPage/DatePicker">
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
      <section class="bg-gray-300 py-8 md:py-16 mt-28 ">
        <div class="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <div class="mx-auto max-w-5xl">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
              Payment
            </h2>

            <div class="mt-6 sm:mt-8 lg:flex lg:items-start lg:gap-12">
              <form
                action="#"
                class="w-full rounded-lg border border-gray-200 p-4 shadow-sm bg-white sm:p-6 lg:max-w-xl lg:p-8"
              >
                <div class="mb-6 grid grid-cols-2 gap-4">
                  <div class="col-span-2 sm:col-span-1">
                    <label
                      for="full_name"
                      class="mb-2 block text-sm font-medium text-gray-900 dark:text-black"
                    >
                      Full name (as displayed on card)*
                    </label>
                    <input
                      type="text"
                      id="full_name"
                      class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600  dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                      placeholder="Bonnie Green"
                      required
                    />
                  </div>

                  <div class="col-span-2 sm:col-span-1">
                    <label
                      for="card-number-input"
                      class="mb-2 block text-sm font-medium text-gray-900 dark:text-black"
                    >
                      Card number*
                    </label>
                    <input
                      type="text"
                      id="card-number-input"
                      class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pe-10 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600  dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                      placeholder="xxxx-xxxx-xxxx-xxxx"
                      pattern="^4[0-9]{12}(?:[0-9]{3})?$"
                      required
                    />
                  </div>

                  <div>
                    <label
                      for="card-expiration-input"
                      class="mb-2 block text-sm font-medium text-gray-900 dark:text-black"
                    >
                      Card expiration*
                    </label>
                    <div class="relative">
                      <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                        <svg
                          class="h-4 w-4 text-gray-500 dark:text-gray-400"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M5 5a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1h1a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1h1a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1 2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a2 2 0 0 1 2-2ZM3 19v-7a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Zm6.01-6a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm2 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm6 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm-10 4a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm6 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm2 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Z"
                            clip-rule="evenodd"
                          />
                        </svg>
                      </div>
                      <input
                        datepicker
                        datepicker-format="mm/yy"
                        id="card-expiration-input"
                        type="text"
                        class="block w-full rounded-lg border border-gray-300 text-black p-2.5 ps-9 text-sm  focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600   dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                        placeholder="12/23"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      for="cvv-input"
                      class="mb-2 flex items-center gap-1 text-sm font-medium text-gray-900 dark:text-black"
                    >
                      CVV*
                      <button
                        data-tooltip-target="cvv-desc"
                        data-tooltip-trigger="hover"
                        class="text-gray-400 hover:text-gray-900 dark:text-gray-500 dark:hover:text-white"
                      >
                        <svg
                          class="h-4 w-4"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm9.408-5.5a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2h-.01ZM10 10a1 1 0 1 0 0 2h1v3h-1a1 1 0 1 0 0 2h4a1 1 0 1 0 0-2h-1v-4a1 1 0 0 0-1-1h-2Z"
                            clip-rule="evenodd"
                          />
                        </svg>
                      </button>
                      <div
                        id="cvv-desc"
                        role="tooltip"
                        class="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 dark:bg-gray-700"
                      >
                        The last 3 digits on back of card
                        <div class="tooltip-arrow" data-popper-arrow></div>
                      </div>
                    </label>
                    <input
                      type="number"
                      id="cvv-input"
                      aria-describedby="helper-text-explanation"
                      class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600  dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                      placeholder="•••"
                      required
                    />
                  </div>
                </div>
                <button
                  type="button"
                  class="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 w-96 ml-14 mt-10 "
                >
                  Book Now{" "}
                </button>{" "}
              </form>

              <div class="mt-6 grow sm:mt-8 lg:mt-0">
                <div class="space-y-4 rounded-lg border border-gray-100 bg-gray-50 p-6 dark:border-gray-700 dark:bg-white">
                  <div class="space-y-2">
                    <dl class="flex items-center justify-between gap-4">
                      <dt class="text-base font-normal ">Original price</dt>
                      <dd class="text-base font-medium ">$6,592.00</dd>
                    </dl>

                    <dl class="flex items-center justify-between gap-4">
                      <dt class="text-base font-normal ">Savings</dt>
                      <dd class="text-base font-medium text-green-500">
                        -$299.00
                      </dd>
                    </dl>

                    <dl class="flex items-center justify-between gap-4">
                      <dt class="text-base font-normal ">Store Pickup</dt>
                      <dd class="text-base font-medium ">$99</dd>
                    </dl>
                  </div>

                  <dl class="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                    <dt class="text-base font-bold ">Total</dt>
                    <dd class="text-base font-bold ">$7,191.00</dd>
                  </dl>
                </div>

                <div class="mt-6 flex items-center justify-center gap-8">
                  <img
                    class="h-8 w-auto dark:hidden"
                    src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/paypal.svg"
                    alt="PayPal"
                  />
                  <img
                    class="hidden h-8 w-auto dark:flex"
                    src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/paypal-dark.svg"
                    alt="PayPal"
                  />
                  <img
                    class="h-8 w-auto dark:hidden"
                    src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/visa.svg"
                    alt="Visa"
                  />
                  <img
                    class="hidden h-8 w-auto dark:flex"
                    src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/visa-dark.svg"
                    alt="Visa"
                  />
                  <img
                    class="h-8 w-auto dark:hidden"
                    src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/mastercard.svg"
                    alt="MasterCard"
                  />
                  <img
                    class="hidden h-8 w-auto dark:flex"
                    src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/mastercard-dark.svg"
                    alt="MasterCard"
                  />
                </div>
              </div>
            </div>

            <p class="mt-6 text-center text-gray-500 dark:text-gray-400 sm:mt-8 lg:text-left">
              Payment processed by{" "}
              <a
                href="#"
                class="font-medium text-primary-700 underline hover:no-underline dark:text-primary-500"
              >
                Paddle
              </a>{" "}
              for{" "}
              <a
                href="#"
                class="font-medium text-primary-700 underline hover:no-underline dark:text-primary-500"
              >
                Flowbite LLC
              </a>{" "}
              - United States Of America
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
export default PayMent;
