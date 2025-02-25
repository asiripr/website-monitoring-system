import React from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

const TopBar = () => {
    const navigate = useNavigate();

    // Get user from localStorage
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    // Logout Function
    const handleLogout = async () => {
        try {
            await API.post("/logout");
            localStorage.removeItem("user"); // Clear user data
            navigate("/login"); // Redirect to login page
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    // Navigate to Login Page
    const handleLogin = () => {
        navigate("/login");
    };

    // Navigate to Register Page
    const handleRegister = () => {
        navigate("/register");
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
                            onClick={handleLogin}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                            Log In
                        </button>
                        <button
                            onClick={handleRegister}
                            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                        >
                            Register
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}

export default TopBar;