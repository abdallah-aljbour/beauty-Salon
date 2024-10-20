// import React from "react";
// import { Link } from "react-router-dom";
// import { UserCircle, CalendarDays, Briefcase, Settings } from "lucide-react";

// const Sidebar = ({ userRole, hasSalonProfile }) => {
//   return (
//     <div className="flex flex-col h-screen w-64 bg-gray-800 text-white">
//       <div className="flex items-center justify-center h-20 bg-gray-900">
//         <h1 className="text-2xl font-semibold">Salon Dashboard</h1>
//       </div>
//       <nav className="flex-grow">
//         <ul className="space-y-2 py-4">
//           <li>
//             <Link
//               to="/SalonOwnerProfile"
//               className="flex items-center px-4 py-2 hover:bg-gray-700"
//             >
//               <UserCircle className="mr-3" />
//               Profile
//             </Link>
//           </li>
//           <li>
//             <Link
//               to="/appointments"
//               className="flex items-center px-4 py-2 hover:bg-gray-700"
//             >
//               <CalendarDays className="mr-3" />
//               Appointments
//             </Link>
//           </li>
//           {userRole === "admin" && !hasSalonProfile && (
//             <li>
//               <Link
//                 to="/create-profile"
//                 className="flex items-center px-4 py-2 hover:bg-gray-700"
//               >
//                 <Briefcase className="mr-3" />
//                 Create Salon Profile
//               </Link>
//             </li>
//           )}
//           {hasSalonProfile && (
//             <li>
//               <Link
//                 to="/services"
//                 className="flex items-center px-4 py-2 hover:bg-gray-700"
//               >
//                 <Briefcase className="mr-3" />
//                 Services
//               </Link>
//             </li>
//           )}
//           <li>
//             <Link
//               to="/settings"
//               className="flex items-center px-4 py-2 hover:bg-gray-700"
//             >
//               <Settings className="mr-3" />
//               Settings
//             </Link>
//           </li>
//         </ul>
//       </nav>
//     </div>
//   );
// };

// export default Sidebar;
import React from "react";
import { Link } from "react-router-dom";
import { UserCircle, CalendarDays, Briefcase, Settings } from "lucide-react";

const Sidebar = () => {
  return (
    <div className="flex flex-col h-screen w-64 bg-gray-800 text-white">
      <div className="flex items-center justify-center h-20 bg-gray-900">
        <h1 className="text-2xl font-semibold">Salon Dashboard</h1>
      </div>
      <nav className="flex-grow">
        <ul className="space-y-2 py-4">
          <li>
            <Link
              to="/SalonOwnerProfile"
              className="flex items-center px-4 py-2 hover:bg-gray-700"
            >
              <UserCircle className="mr-3" />
              Profile
            </Link>
          </li>
          <li>
            <Link
              to="/OpeningHoursEditor"
              className="flex items-center px-4 py-2 hover:bg-gray-700"
            >
              <CalendarDays className="mr-3" />
              Opening Hours
            </Link>
          </li>
          <li>
            <Link
              to="/admin-dashboard"
              className="flex items-center px-4 py-2 hover:bg-gray-700"
            >
              <Briefcase className="mr-3" />
              Create Salon Profile
            </Link>
          </li>
          <li>
            <Link
              to="/ServiceCards"
              className="flex items-center px-4 py-2 hover:bg-gray-700"
            >
              <Briefcase className="mr-3" />
              Services
            </Link>
          </li>
          <li>
            <Link
              to="/settings"
              className="flex items-center px-4 py-2 hover:bg-gray-700"
            >
              <Settings className="mr-3" />
              Settings
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
