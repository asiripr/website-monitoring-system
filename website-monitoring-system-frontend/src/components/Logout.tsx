import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post("http://127.0.0.1:8000/api/logout", {}, {
        headers: { Authorization: 'Bearer ${localStorage.getItem("token")}' }
      });
      // remove token from the local storage
      localStorage.removeItem("token");

      // redirect to login page
      navigate('/login');
    } catch (error) {
      console.error("Logout failed: ", error);
    }
  };
};

export default Logout;