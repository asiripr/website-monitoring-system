import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { useEffect, useState, createContext } from "react";
import React from "react";
// import { getUser } from "./services/auth";
import './index.css';
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import Layout from "./components/Layout";
import Unauthorized from "./pages/Unauthorized";
import Websites from "./pages/Websites";
import AddWebsites from "./pages/AddWebsites";
import MonitoringLogs from "./pages/MonitoringLogs";
import ManageUsers from "./pages/ManageUsers";
import MonitoringLogsDetails from "./pages/MonitoringLogsDetails";
import Settings from "./pages/Settings";
import ManageUser from "./pages/ManageUser";
import API from "./services/api";
import ManageRoles from "./pages/ManageRoles";
import EditRole from "./pages/EditRole";
import CreateRole from "./pages/CreateRole";
import AdminDashboard from "./pages/AdminDashboard";

const App = () => {
  const [user, setUser] = useState({
    id: 0,
    name: "",
    email: "",
    role_id: 2
  });
  const [loading, setLoading] = useState(true);

  // Check authentication status on app load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Ensure CSRF token is set if using Sanctum
        await API.get('/sanctum/csrf-cookie');
        const response = await API.get('/api/user', {
          headers: { Authorization: `Bearer ${localStorage.getItem("auth_token")}` },
        });
        console.log("Authenticated user:", response.data);
        // Ensure response.data is not an empty object
        setUser(response.data);
      } catch (error) {
        console.error("Authentication error:", error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Protected route wrapper
  const RequireAuth = () => {
    return user && user.id ? <Outlet /> : <Navigate to="/login" replace />;
  };

  // Admin-specific protection
  const RequireAdmin = () => {
    return user.role_id === 1 ? <Outlet /> : <Navigate to="/unauthorized" replace />;
  };

  if (loading) return (
    <div className="p-4 flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600 border-opacity-50">
      </div>
    </div>
  );

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route element={<RequireAuth />}>
          <Route element={<Layout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/websites" element={<Websites />} />
            <Route path="/websites/add" element={<AddWebsites />} />
            <Route path="/monitoring-logs" element={<MonitoringLogs />} />
            <Route path="/monitoring-logs/:id" element={<MonitoringLogsDetails />} />
            <Route path="/settings" element={<Settings />} />

            {/* Admin-only Routes */}
            <Route element={<RequireAdmin />}>
              <Route path="/musers" element={<ManageUsers />} />
              <Route path="/manage-users/edit/:id" element={<ManageUser />} />
              <Route path="/admin" element={<AdminDashboard />} />

              <Route path="/manage-roles" element={<ManageRoles />} />
              <Route path="/manage-roles/edit/:id" element={<EditRole />} />
              <Route path="/manage-roles/create" element={<CreateRole />} />
            </Route>
          </Route>
        </Route>

        {/* Fallback routes */}
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="*" element={<Navigate to={user ? "/dashboard" : "/login"} />} />
      </Routes>
    </Router>
  );
};


export default App;
