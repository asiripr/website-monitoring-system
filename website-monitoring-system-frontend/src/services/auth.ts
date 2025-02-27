import API from "./api";

// register function 
export const register = async (name: string, email: string, password: string, password_confirmation: string, role_id = 2) => {
    try {
        // ensure csrf token is obtained
        await API.get("/sanctum/csrf-cookie");
        const response = await API.post("/api/register", {
            name,
            email,
            password,
            password_confirmation,
            role_id
        });
        return response.data;
    } catch (error) {
        console.error("Registration Error: ", error);
        throw error;
    }
// as long as you feel pain you 
};

// login function -> working with sanctum

export const login = async (email: string, password: string) => {
    try {
         // get csrf token before login -> API requests to Laravel
        await API.get("/sanctum/csrf-cookie");
        // return API.post("/login", { email, password });
        const response = await API.post("/api/login", { email, password });
        // store the token
        localStorage.setItem('auth_token', response.data.token); 
        // store user data in localStorage or Context API
        localStorage.setItem('user', JSON.stringify(response.data.user));
        

        return response.data;

    } catch (error) {
        console.error("Login Error: ", error);
        throw error;
    }
};

// logout function -> API requests to Laravel
export const logout = async () => {
    return API.post("/logout");
};

// get logged-in user -> if authenticated, fetches the currently logged-in user
// export const  = async () => {
//     try {
//         const response = await API.get("/user");
//         return response.data;
//     } catch (error) {
//         console.error("Get User Error: ", error);
//         throw new Error("Failed to fetch user data.");
//     }
// };