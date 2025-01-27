import axios from "axios";

const API = axios.create({
  baseURL: "https:https://demo-ore-tech-api.vercel.app/api",
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