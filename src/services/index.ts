import axios from "axios";

const API_URL = "http://localhost:8000/"

export const AxiosInstance = axios.create({
    baseURL: API_URL,
    timeout: 10000,  
    headers: {
        'Content-Type': 'application/json',
    }
})