import { API_ENDPOINTS } from "./apiEndpoints.js";

const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

const uploadProfileImage = async (image) => {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    try {
        const response = await fetch(API_ENDPOINTS.UPLOAD_IMAGE, {
            method: "POST",
            body: formData,
        });
        if (!response.ok) {
            throw new Error("Failed to upload image");
        }
        const data = await response.json();
        console.log("Image uploaded successfully");
        
        return data.secure_url;
    } catch (error) {
        console.error("Error uploading profile image:", error);
    }
}

export default uploadProfileImage