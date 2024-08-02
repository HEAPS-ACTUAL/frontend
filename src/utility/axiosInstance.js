import axios from "axios";

const BE_IP_ADDRESS = '54.255.215.236'; // production
const BE_PROTO_IP = '18.139.224.111'; // prototype
const localhost = 'localhost';

const axiosInstance = axios.create({
    baseURL: `http://${localhost}:8001`,
    headers: { "Content-Type": "application/json" },
    withCredentials: false,
});

export default axiosInstance;