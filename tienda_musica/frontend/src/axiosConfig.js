import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000', // Cambia esto si tu backend está en otra URL
});

// Interceptor de requests: agrega el token
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

//Interceptor de respuestas: intenta reshelear el token si es necesario
api.interceptors.response.use(
    (response) => response,
    async (error) => {  
        const originalRequest = error.config;

        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const refreshToken = localStorage.getItem('refreshToken');
                const response = await axios.post('http://localhost:8000/api/token/refresh/', 
                    { refresh: refreshToken });
                const newAccessToken = response.data.access;
                localStorage.setItem('accessToken', newAccessToken);

                // Actualiza el token en el header de la solicitud original
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return api(originalRequest);
            } catch (refreshError) {
                console.error('Error al refrescar el token:', refreshError);
                // Si el refresh falla, limpia los tokens y redirige al login
            }
        }
        return Promise.reject(error);
    }
);

export default api;
