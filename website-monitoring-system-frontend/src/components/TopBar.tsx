import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import API from "../services/api";

const TopBar = () => {
    const navigate = useNavigate();

    const [user, setUser] = useState({
        id: 0,
        name: "",
        email: "",
        role_id: 2
    });

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
          }
        };
        checkAuth();
      }, []);

    // Logout Function
    const handleLogout = async () => {
        try {
            await axios.post("http://127.0.0.1:8000/api/logout", {}, {
                headers: { Authorization: `Bearer ${localStorage.getItem(`auth_token`)}` }
            });
            // remove token from the local storage
            localStorage.removeItem('auth_token');

            // redirect to login page
            navigate('/login');
        } catch (error) {
            console.error("Logout failed: ", error);
        }
    };

    return (
        <div className="bg-white flex justify-between items-center p-4 shadow-md">
            <h1 className="text-black text-2xl font-bold">Website Monitoring System</h1>
            <div className="flex items-center space-x-4">
                {user?.name ? (
                    <>
                        <span className="text-gray-600">Welcome, {user.name}</span>
                        <button
                            onClick={handleLogout}
                            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <button
                            onClick={handleLogout}
                            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                        >
                            Logout
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}

export default TopBar;