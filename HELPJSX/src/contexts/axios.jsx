import axios from 'axios';
import { Navigate } from 'react-router-dom';

const axiosClient = axios.create({
    baseURL: `${import.meta.env.VITE_APP_BASE_URL}/api`
})

axiosClient.interceptors.request.use( (config) => {
    const token = localStorage.getItem('ACCESS_TOKEN');
    config.headers.Authorization = `Bearer ${token}`;
    return config;
});

axiosClient.interceptors.response.use( response => {
    return response;
}, error => {
    if ( error.response && error.response.status === 401 ){
        <Navigate to ="/Login" />
        return;
    }
    throw error;
})

export default axiosClient;