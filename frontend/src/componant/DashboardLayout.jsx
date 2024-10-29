import React from "react";
import Sidebar from "./sidebar"; // Adjust the import path as needed

const DashboardLayout = ({ children, userRole, hasSalonProfile }) => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar userRole={userRole} hasSalonProfile={hasSalonProfile} />
      <main className="flex-1 overflow-y-auto p-6">{children}</main>
    </div>
  );
};

export default DashboardLayout;
