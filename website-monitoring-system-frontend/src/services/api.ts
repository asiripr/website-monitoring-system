import axios from "axios";

// we use axios to communicate react frontend to laravel backend

const API = axios.create({
    // declare the laravel localhost url as baseURL
    baseURL: "http://localhost:8000/",

    // in laravel side sanctum needs withCredentials: true to maintain sessions between React and Laravel.
    withCredentials: true,

    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

export default API;