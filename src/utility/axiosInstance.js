import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://18.139.224.111:8001",
    headers: { "Content-Type": "application/json" },
    withCredentials: false,
});

export default axiosInstance;