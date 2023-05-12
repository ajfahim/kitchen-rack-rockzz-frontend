import axios from "axios";
import { toast } from "react-hot-toast";

const apiClient = axios.create({
  baseURL: process.env.backend_url,
  headers: {
    "Content-Type": "application/json",
  },
});

// Check if localStorage is available
if (typeof window !== "undefined" && window.localStorage) {
  const token = localStorage.getItem("authToken");
  if (token) {
    apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
}

//error Handling
// Add a response interceptor to the apiClient

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const { status, data } = error.response || {};
    const message = data || "Something went wrong";

    if (status === 404) {
      toast.error(message);
    }

    return Promise.reject(error);
  }
);

export default apiClient;
