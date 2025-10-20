import axios from "axios";

const baseURL = import.meta.env.BACKEND_URL;

const axiosConfig = axios.create({
    baseURL: baseURL,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});

const excludeEndpoints = ["/auth/login", "/auth/register", "/auth/activate", "health"];

// request interceptor
axiosConfig.interceptors.request.use((config) => {
    const shouldSkipToken = excludeEndpoints.some((endpoint) => config.url?.includes(endpoint));

    if (!shouldSkipToken) {
        const accessToken = localStorage.getItem("token");
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

// response interceptor
axiosConfig.interceptors.response.use((response) => {
    return response;
}, (error) => {
    if (error.response && error.response.status === 401) {
        window.location.href = "/login";
    } else if (error.response && error.response.status === 500) {
        console.error("Server Error:", error.response.data);
    } else if (error.code === 'ECONNABORTED') {
        console.error("Request timed out:", error.message);
    }
    return Promise.reject(error);
});

