import axios from "axios";

export const apiClient = axios.create({
  baseURL: import.meta.env.REACT_APP_API_URL || "https://naa-task-backend.vercel.app/api",
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired - logout
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);
