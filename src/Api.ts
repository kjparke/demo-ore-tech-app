import axios from "axios";

const API = axios.create({
  baseURL: "http://172.31.33.94:3001/api",
  headers: {"Content-Type": "application/json"}
});

API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); 
    
    if (token) {
      config.headers['x-access-token'] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default API;