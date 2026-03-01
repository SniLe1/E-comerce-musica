import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000', // Cambia esto si tu backend está en otra URL
});

api.interceptors.request.use(
    (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
    },
    (error) => Promise.reject(error)
);

export default api;
