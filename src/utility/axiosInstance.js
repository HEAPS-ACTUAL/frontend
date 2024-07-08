import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://54.255.215.236:8001",
    headers: { "Content-Type": "application/json" },
    withCredentials: false,
});

export default axiosInstance;