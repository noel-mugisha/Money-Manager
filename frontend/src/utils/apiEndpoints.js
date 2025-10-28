
const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

export const API_ENDPOINTS = {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    ACTIVATE: "/auth/activate",
    HEALTH: "/health",
    UPLOAD_IMAGE: `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
    GET_USER_INFO: "/profile",
    ADD_CATEGORY: "/categories",
    GET_ALL_CATEGORIES: "/categories",
    UPDATE_CATEGORY: (categoryId) => `/categories/${categoryId}`,
};