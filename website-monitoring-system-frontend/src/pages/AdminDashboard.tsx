import React from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <header className="mb-9">
        <h1 className="text-4xl font-bold text-gray-800">Admin Dashboard</h1>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Manage Users */}
        <div
          onClick={() => navigate("/musers")}
          className="bg-white p-6 rounded-lg shadow-md cursor-pointer hover:bg-blue-50"
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Manage Users
          </h2>
          <p className="text-gray-600">View and update user accounts</p>
        </div>
        {/* Manage User Roles */}
        <div
          onClick={() => navigate("/manage-roles")}
          className="bg-white p-6 rounded-lg shadow-md cursor-pointer hover:bg-blue-50"
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Manage User Roles
          </h2>
          <p className="text-gray-600">
            Create or update roles and assign permissions
          </p>
        </div>
        {/* Create New Role */}
        <div
          onClick={() => navigate("/manage-roles/create")}
          className="bg-white p-6 rounded-lg shadow-md cursor-pointer hover:bg-blue-50"
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Create New Role
          </h2>
          <p className="text-gray-600">Add a new role to the system</p>
        </div>
        {/* Monitoring Logs */}
        <div
          onClick={() => navigate("#")}
          className="bg-white p-6 rounded-lg shadow-md cursor-pointer hover:bg-blue-50"
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            View System Logs
          </h2>
          <p className="text-gray-600">
            Check system logs
          </p>
        </div>
        {/* Additional admin functions can be added here */}
      </div>
    </div>
  );
};

export default AdminDashboard;
