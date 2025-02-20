import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUser } from "./services/auth";
import './index.css';
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import LogoutButton from "./components/LogoutButton";
import Register from "./pages/Register";
import SideBar from "./components/SideBar";
import TopBar from "./components/TopBar";
import Layout from "./components/Layout";

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUser()
      .then(response => setUser(response.data))
      .catch(() => setUser(null));
  }, []);

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Layout />} />
        <Route path="/" element={<Layout />} />
        {/* Protected Routes (Inside Layout) */}
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes> 
    </Router>
  );
};

export default App;
