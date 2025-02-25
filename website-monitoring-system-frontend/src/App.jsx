import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
// import { getUser } from "./services/auth";
import './index.css';
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import LogoutButton from "./components/LogoutButton";
import Register from "./pages/Register";
import SideBar from "./components/SideBar";
import TopBar from "./components/TopBar";
import Layout from "./components/Layout";
import Unauthorized from "./pages/Unauthorized";

const App = () => {
  const [user, setUser] = useState(null);

  // useEffect(() => {
  //   getUser()
  //     .then(response => setUser(response.data))
  //     .catch(() => setUser(null));
  // }, []);

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Layout />} />

        {/* Protected Routes (Inside Layout) */}
        <Route element={<Layout />}>
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="/dashboard" element={<Dashboard />} />
          {/* <Route path="/admin/dashboard" element={<Dashboard />} /> */}
        </Route>

        {/* Admin-Only Routes */}
        {/* <Route element={<ProtectedRoute user={user} allowedRoles={["admin"]} />}>
          <Route element={<Layout />}>
            <Route path="/admin/dashboard" element={<Dashboard />} />
          </Route>
        </Route> */}
      </Routes>
    </Router>
    // <Router>
    //   <Routes>
    //     {/* Public Routes */}
    //     

    //     {/* Protected Routes for Normal Users */}
    //     <Route element={<ProtectedRoute user={user} allowedRoles={["user", "admin"]} />}>
    //       <Route element={<Layout />}>
    //         <Route path="/dashboard" element={<Dashboard />} />
    //         <Route path="/unauthorized" element={<Unauthorized />} />
    //       </Route>
    //     </Route>

    //     {/* Admin-Only Routes */}
    //     <Route element={<ProtectedRoute user={user} allowedRoles={["admin"]} />}>
    //       <Route element={<Layout />}>
    //         <Route path="/admin/dashboard" element={<AdminDashboard />} />
    //       </Route>
    //     </Route>

    //     {/* Catch-All Route (Redirect to Login) */}
    //     <Route path="*" element={<Login />} />
    //   </Routes>
    // </Router>
  );
};


export default App;
