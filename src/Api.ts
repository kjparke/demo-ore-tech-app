import axios from "axios";

const API = axios.create({
  baseURL: "https://demo-ore-tech-hj7uh8q4s-kevin-parkes-projects.vercel.app/api",
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