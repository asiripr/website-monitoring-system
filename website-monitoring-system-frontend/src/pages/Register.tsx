import { useState } from "react"; // store and update values
import {  register } from "../services/auth";
import { useNavigate } from "react-router-dom"; // navigate to different routes
import React from "react";

const Register = () => {
    // initialize empty string and function for update name
    const [name, setName] = useState("");

    // initialize empty string and function for update email
    const [email, setEmail] = useState("");

    // initialize empty string and function for update password
    const [password, setPassword] = useState("");

    // initialize empty string and function for update password confirmation
    const [passwordConfirmation, setPasswordConfirmation] = useState("");

    // redirect the user to the dashboard if the Register is successfull
    const navigate = useNavigate();

    // function for handle the form submission
    const handleRegister = async (e: React.FormEvent) => {

        // prevents the default form submission behavior, which would normally reload the page.
        e.preventDefault();

        // Check if the password and password confirmation match
        // if (password !== password_confirmation) {
        //     alert("Passwords do not match. Please try again.");
        //     return;
        // }

        try {
            // calls the Register function with the current email and password
            await register(name, email, password, passwordConfirmation);
            // After registration, fetch the user
            // const user = await getUser();
            alert("Registration successful! You can now log in.");

            // redirect to login
            // navigate("/login");
        } catch (error) {

            // shows an alert
            alert("Registration failed. Please try again.");
            console.error("Registration error: ", error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-300 text-white">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                <h1 className="text-2xl font-bold mb-4 text-black">Register</h1>
                <h2 className="text-xl mb-6 text-black">Website Monitoring System</h2>

                {/*  defines a form that calls the handleRegister function when submitted. */}
                <form onSubmit={handleRegister} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        required
                        className="text-black w-full px-4 py-2 border border-gray-300 rounded focus:ring focus:ring-blue-200"
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                        className="text-black w-full px-4 py-2 border border-gray-300 rounded focus:ring focus:ring-blue-200"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                        className="text-black w-full px-4 py-2 border border-gray-300 rounded focus:ring focus:ring-blue-200"
                    />
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        value={passwordConfirmation}
                        onChange={e => setPasswordConfirmation(e.target.value)}
                        required
                        className="text-black w-full px-4 py-2 border border-gray-300 rounded focus:ring focus:ring-blue-200"
                    />
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Register
                    </button>
                </form>
                <p className="text-center mt-4 text-black">
                    Already have an account? <a href="/login" className="text-blue-500 hover:underline">Login</a>
                </p>
            </div>
        </div>
    );
};

export default Register;