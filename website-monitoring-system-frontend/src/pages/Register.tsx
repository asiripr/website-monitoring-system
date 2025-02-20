import { useState } from "react"; // store and update values
import { register } from "../services/auth";
import { useNavigate } from "react-router-dom"; // navigate to different routes
import React from "react";

const Register = () => {
    // initialize empty string and function for update name
    const [name, setName] = useState("");

    // initialize empty string and function for update email
    const [email, setEmail] = useState("");

    // initialize empty string and function for update password
    const [password, setPassword] = useState("");

    // redirect the user to the dashboard if the Register is successfull
    const navigate = useNavigate();

    // function for handle the form submission
    const handleRegister = async (e: React.FormEvent) => {

        // prevents the default form submission behavior, which would normally reload the page.
        e.preventDefault();
        try {
            // calls the Register function with the current email and password
            await register(name, email, password);
            alert("Registration successful! You can now log in.");

            // redirect to login
            navigate("/login");
        } catch (error) {

            // shows an alert
            alert("Registration failed. Please try again.");
            console.error("Registration error: ", error);
        }
    };


    return (
        <div className="register-container">
            <h1>Register</h1>
            <h2>Website Monitoring System</h2>

            {/*  defines a form that calls the handleRegister function when submitted. */}
            <form onSubmit={handleRegister}>
                <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} required /><br />
                <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required /><br />
                <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required /><br />
                <button type="submit">Register</button>
            </form>
            <p>Already have an account? <a href="/login">Login</a></p>
        </div>
    );
};

export default Register;
