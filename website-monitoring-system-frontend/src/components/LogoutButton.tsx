import { logout } from "../services/auth";
import { useNavigate } from "react-router-dom";
import React from "react";

const LogoutButton = () => {
    const navigate = useNavigate();

    // handles the button click event
    const handleLogout = async () => {
        try {
            await logout();
            alert("Logged out successfully!");
            //  redirect the user to the login page if the logout is successfull
            navigate("/login");
        }catch( error ){
            alert( "Logout failed." );
            console.error("logout error: ", error);
        }
    };

    return (
        <button onClick={handleLogout}>Logout</button>
    );
}

export default LogoutButton;