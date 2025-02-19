import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUser } from "./services/auth";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import LogoutButton from "./components/LogoutButton";
import Register from "./pages/Register";

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
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
      </Routes>
      {user && <LogoutButton />}
    </Router>
  );
};

export default App;
