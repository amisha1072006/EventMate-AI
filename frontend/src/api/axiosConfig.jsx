// src/api/axiosConfig.js
import axios from 'axios';

// Ek naya Axios instance banayein
const apiClient = axios.create({
    baseURL: 'http://localhost:8080', // Aapke backend ka base URL
});

// Ek request interceptor add karein
apiClient.interceptors.request.use(
    (config) => {
        // localStorage se token nikaalein (ya jahaan bhi store kiya ho)
        const token = localStorage.getItem('token'); 

        // Agar token hai, toh use Authorization header mein add karein
        if (token) {
            // Header ka naam 'Authorization' hona zaroori hai
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config; // Badla hua config return karein
    },
    (error) => {
        // Request error ko handle karein
        return Promise.reject(error);
    }
);

export default apiClient; // Configure kiye gaye instance ko export karein