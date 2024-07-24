import axios from "axios";

const BE_IP_ADDRESS = '54.255.215.236';
const localhost = 'localhost';

const axiosInstance = axios.create({
    baseURL: `http://${BE_IP_ADDRESS}:8001`,
    headers: { "Content-Type": "application/json" },
    withCredentials: false,
});

export default axiosInstance;