import API from "./api";

// login function -> working with sanctum

export const login = async (email: string, password: string) => {
    // get csrf token before login -> API requests to Laravel
    await API.get("/sanctum/csrf-cookie"); 
    return API.post("/login", {email, password});
};

// logout function -> API requests to Laravel
export const logout = async () => {
    return API.post("/logout");
};

// get logged-in user -> if authenticated, fetches the currently logged-in user
export const getUser = async () => {
    return API.get("/user");
};