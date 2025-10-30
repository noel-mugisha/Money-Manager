
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
    // Income Module
    GET_ALL_INCOMES: "/incomes",
    CATEGORY_BY_TYPE: (categoryType) => `/categories?type=${categoryType}`,
    ADD_INCOME: "/incomes",
    DELETE_INCOME: (incomeId) => `/incomes/${incomeId}`,
    SEND_INCOME_EMAIL: "/incomes/email/send",
    INCOME_EXCEL_DOWNLOAD: "/incomes/excel/download",
    // Expense Module
    GET_ALL_EXPENSES: "/expenses",
    ADD_EXPENSE: "/expenses",
    DELETE_EXPENSE: (expenseId) => `/expenses/${expenseId}`,
    SEND_EXPENSE_EMAIL: "/expenses/email/send",
    EXPENSE_EXCEL_DOWNLOAD: "/expenses/excel/download",
};