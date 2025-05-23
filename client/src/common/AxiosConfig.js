import connectApi, { baseUrl } from './ApiBackend.js'
import axios from 'axios'

// Create axios instance
const axiosInstance = axios.create({
    baseURL: baseUrl,
    withCredentials: true,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
})

// Interceptors
axiosInstance.interceptors.request.use(async(config) => {
        const token = localStorage.getItem('token')
        if(token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    }, 
    (error) => {
        return Promise.reject(error)
    }
)

axiosInstance.interceptors.response.use((response) => {
        return response
    }, 
    async(error) => {
        return Promise.reject(error)
    }
)

export default axiosInstance