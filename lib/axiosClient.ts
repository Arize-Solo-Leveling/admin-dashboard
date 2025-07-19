import axios from "axios";
import { time } from "console";

const axiosClient = axios.create({
    baseURL : "http://localhost:8080",
    headers : {
        "Content-Type" : "application/json",
    },
});

axiosClient.interceptors.request.use((config) => {
    if(typeof window !=   "undefined"){
        const token = localStorage.getItem("token");
        if(token){
            config.headers.Authorization = `Bearer ${token}`;
        }
    }
    return config;
});

export default axiosClient;
