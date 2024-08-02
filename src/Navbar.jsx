// function Navbar() {
//   return (
//     <>
//       <nav className="border-gray-200 bg-gradient-to-r from-red-300 to-white shadow sticky top-0 z-50">
//         <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
//           <a
//             href="https://flowbite.com/"
//             className="flex items-center space-x-3 rtl:space-x-reverse"
//           >
//             <span className="self-center text-2xl font-semibold whitespace-nowrap text-black dark:text-black">
//               BeautySalon
//             </span>
//           </a>
//           <div className="flex md:order-2 text-black">
//             <button
//               type="button"
//               data-collapse-toggle="navbar-search"
//               aria-controls="navbar-search"
//               aria-expanded="false"
//               className="md:hidden text-gray-500 dark:text-gray-400 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 me-1"
//             >
//               <svg
//                 className="w-5 h-5 text-black"
//                 aria-hidden="true"
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 20 20"
//               >
//                 <path
//                   stroke="currentColor"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
//                 />
//               </svg>
//               <span className="sr-only">Search</span>
//             </button>
//             <div className="relative hidden md:block">
//               <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
//                 <svg
//                   className="w-4 h-4 text-gray-500 dark:text-gray-400"
//                   aria-hidden="true"
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 20 20"
//                 >
//                   <path
//                     stroke="currentColor"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
//                   />
//                 </svg>
//                 <span className="sr-only">Search icon</span>
//               </div>
//               <input
//                 type="text"
//                 id="search-navbar"
//                 className="block w-full p-2 ps-10 text-sm text-black border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                 placeholder="Search..."
//               />
//             </div>
//             <button
//               data-collapse-toggle="navbar-search"
//               type="button"
//               className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-black rounded-lg md:hidden focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:focus:ring-gray-600"
//               aria-controls="navbar-search"
//               aria-expanded="false"
//             >
//               <span className="sr-only">Open main menu</span>
//               <svg
//                 className="w-5 h-5 text-black"
//                 aria-hidden="true"
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 17 14"
//               >
//                 <path
//                   stroke="currentColor"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M1 1h15M1 7h15M1 13h15"
//                 />
//               </svg>
//             </button>
//           </div>
//           <div
//             className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
//             id="navbar-search"
//           >
//             <div className="relative mt-3 md:hidden">
//               <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
//                 <svg
//                   className="w-4 h-4 text-gray-500 dark:text-gray-400"
//                   aria-hidden="true"
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 20 20"
//                 >
//                   <path
//                     stroke="currentColor"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
//                   />
//                 </svg>
//               </div>
//               <input
//                 type="text"
//                 id="search-navbar"
//                 className="block w-full p-2 ps-10 text-sm text-black border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                 placeholder="Search..."
//               />
//             </div>
//             <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 dark:bg-transparent dark:border-transparent">
//               <li>
//                 <a
//                   href="#"
//                   className="block py-2 px-3 text-black rounded md:text-black md:p-0 md:dark:text-black"
//                   aria-current="page"
//                 >
//                   Home
//                 </a>
//               </li>
//               <li>
//                 <a
//                   href="#"
//                   className="block py-2 px-3 text-black rounded hover:text-blue-700 md:hover:text-blue-700 md:p-0 md:dark:text-black dark:text-black dark:hover:text-blue-700"
//                 >
//                   About
//                 </a>
//               </li>
//               <li>
//                 <a
//                   href="#"
//                   className="block py-2 px-3 text-black rounded hover:text-blue-700 md:hover:text-blue-700 md:p-0 md:dark:text-black dark:text-black dark:hover:text-blue-700"
//                 >
//                   Services
//                 </a>
//               </li>
//             </ul>
//           </div>
//         </div>
//       </nav>
//     </>
//   );
// }
import { Link } from "react-router-dom";
function Navbar() {
  return (
    <>
      <nav
        className="flex items-center justify-between p-6 lg:px-8 "
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only ">Your Company</span>
            <p className="italic font-black">BeautySalon</p>
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          <Link to="/">Home</Link>
          <Link to="/">Features</Link>
          <Link to="/catalog/MainCatalog">Catalog</Link>
          <Link to="/">Contact</Link>
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <Link
            to="/signinRegister/signin"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Log in <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </nav>
    </>
  );
}
export default Navbar;
