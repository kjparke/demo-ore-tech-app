import axios from "axios";

const PDF_API = axios.create({
  // baseURL: "http://172.31.33.94:3001/api",
  baseURL: "http://localhost:3010/",
  headers: {"Content-Type": "application/json"}
});

PDF_API.interceptors.request.use(
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

export default PDF_API;