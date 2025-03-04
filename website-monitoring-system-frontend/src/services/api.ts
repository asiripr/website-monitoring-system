import axios from "axios";
import React from "react";

// we use axios to communicate react frontend to laravel backend

const API = axios.create({
    // declare the laravel localhost url as baseURL
    baseURL: "http://127.0.0.1:8000/",

    // in laravel side sanctum needs withCredentials: true to maintain sessions between React and Laravel.
    withCredentials: true,

    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
});

// Add CSRF token handling
API.interceptors.request.use(async (config) => {
    if (!document.cookie.includes('XSRF-TOKEN')) {
        await axios.get('/sanctum/csrf-cookie', {
            withCredentials: true
        });
    }
    return config;
});

export default API;