import { useState } from "react"; // store and update values
import { login } from "../services/auth";
import { useNavigate } from "react-router-dom"; // navigate to different routes
import React from "react";

const Login = () => {
  // initialize empty string and function for update email
  const [email, setEmail] = useState("");

  // initialize empty string and function for update password
  const [password, setPassword] = useState("");

  // redirect the user to the dashboard if the login is successfull
  const navigate = useNavigate();
  // to prevent double press the button
  const [isLoading, setIsLoading] = useState(false);

  // function for handle the form submission
  const handleLogin = async (e: React.FormEvent) => {

    // prevents the default form submission behavior, which would normally reload the page.
    e.preventDefault();
    // Prevent multiple submissions
    if (isLoading) return; 
    setIsLoading(true);
    try {

      // calls the login function with the current email and password
      await login(email, password);

      
      // const user = await getUser();
      alert("Login Successful!");

      

      // redirect to dashboard
      navigate("/dashboard");
    } catch (error) {

      // shows an alert
      alert("Login failed. Check your credentials.");
      console.error("Login error: ", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-300">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-2xl font-bold mb-4 text-black">Login</h1>
        <h2 className="text-xl mb-6 text-black">Website Monitoring System</h2>

        {/*  defines a form that calls the handleLogin function when submitted. */}
        <form onSubmit={handleLogin} className="space-y-4">
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
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Login
          </button>
        </form>
        <p className="text-center mt-4 text-black">
          Create new account? <a href="/register" className="text-blue-500 hover:underline">Register</a>
        </p>
      </div>
    </div>
  );
};

export default Login;