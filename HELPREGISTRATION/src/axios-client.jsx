// This code is to connect laravel to vite

// import axios to use axios commands
import axios from "axios";

const axiosClient = axios.create({
    // get base URL + api from .env: (URL/api)
    baseURL: `${import.meta.env.VITE_APP_BASE_URL}/api`
    // baseURL: `/api`
})

// on fulfilled, axios request config
axiosClient.interceptors.request.use( (config) => {
    const token = localStorage.getItem('ACCESS_TOKEN')
    config.headers.Authorization = `Bearer ${token}`
    return config;
})

// on fulfilled response, return response; 
axiosClient.interceptors.response.use( (response) => {
    return response
},
// on rejected, error
(error) => {

    
    // get error status
    const {response} = error;

    // if user is unauthorized eg. going to users page without token or token does not exist
    if (response.status == 401){
        localStorage.removeItem('ACCESS_TOKEN')
    }
    // 403 for forbidden pages, 404 for not found pages
        // console.error(error);
    
    // throw error got
    throw error;

})


export default axiosClient;