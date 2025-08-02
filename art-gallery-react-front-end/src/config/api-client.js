import axios from "axios";
import { AuthResponse } from "../classes/AuthResponse";

const apiClient = axios.create({
    baseURL: 'http://localhost:8080/api',
})

// apiClient.interceptors.request.use(config => {
//     if (!config.url?.includes("/login") && !config.url?.includes("/register")) {
//         const authObject = localStorage.getItem("user");
//         if (authObject) {
//             console.log('authObject', authObject);
//             // let response = new AuthResponse(...authObject);
//             const {token} = JSON.parse(authObject);
//             config.headers.Authorization = `Bearer ${token}`;
//         }
//     }
//     return config;
// }, error => Promise.reject(error));

export default apiClient;