import { useState } from "react";
import { login } from "../services/auth";
import { useNavigate } from "react-router-dom";
import React from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try{
      await login(email, password);
      alert("Login Successfull!");
      navigate("/dashboard");
    } catch ( error ){
      alert("Login failed. Check your credentials.");
      console.error("Login error: ", error);
    }
  };
  

  return (
    
  );
};

export default Login;
