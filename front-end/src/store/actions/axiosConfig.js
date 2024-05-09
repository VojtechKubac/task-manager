import axios from "axios";

const axiosInstance = axios.create({
  //baseURL: 'http://127.0.0.1:8000',
  baseURL: 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 1000,
  withCredentials: true,
});

export default axiosInstance;