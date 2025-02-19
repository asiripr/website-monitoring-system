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

  // function for handle the form submission
  const handleLogin = async (e: React.FormEvent) => {

    // prevents the default form submission behavior, which would normally reload the page.
    e.preventDefault();
    try {

      // calls the login function with the current email and password
      await login(email, password);
      alert("Login Successfull!");

      // redirect to dashboard
      navigate("/dashboard");
    } catch (error) {

      // shows an alert
      alert("Login failed. Check your credentials.");
      console.error("Login error: ", error);
    }
  };


  return (
    <div className="login-container">
      <h1>Login</h1>
      <h2>Website Monitoring System</h2>

      {/*  defines a form that calls the handleLogin function when submitted. */}
      <form onSubmit={handleLogin}>
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required /><br />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required /><br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
