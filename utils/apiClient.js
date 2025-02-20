import axios from 'axios';
import { toast } from 'react-hot-toast';
import Router from 'next/router';

// Keep track of whether we've shown the unauthorized toast
let hasShownUnauthorizedToast = false;

const apiClient = axios.create({
    baseURL: process.env.backend_url,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor to dynamically add the token
apiClient.interceptors.request.use(
    (config) => {
        // Check if localStorage is available
        if (typeof window !== 'undefined' && window.localStorage) {
            const token = localStorage.getItem('authToken');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
    (response) => {
        // Reset the unauthorized toast flag on successful responses
        hasShownUnauthorizedToast = false;
        return response;
    },
    (error) => {
        const { status, data } = error.response || {};
        const message = data?.msg || 'Something went wrong';

        if (status === 401) {
            // Handle unauthorized access
            if (typeof window !== 'undefined') {
                localStorage.removeItem('authToken');
                
                // Only show the toast once
                if (!hasShownUnauthorizedToast) {
                    toast.error('Not authorized. Please login again.');
                    hasShownUnauthorizedToast = true;
                    
                    // Redirect to login page if not already there
                    if (window.location.pathname !== '/login') {
                        Router.push('/login');
                    }
                }
            }
        } else if (status === 404) {
            toast.error(message);
        }

        return Promise.reject(error);
    }
);

export default apiClient;
