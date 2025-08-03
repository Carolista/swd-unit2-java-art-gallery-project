import axios from 'axios';
import { getTokenFromStorage } from '../services/storage-service';

const apiClient = axios.create({
	baseURL: 'http://localhost:8080/api',
});

// Ensures existing token is sent along with requests other than /login and /register
// But currently this doesn't matter because my /admin requests don't use axios
apiClient.interceptors.request.use(
	config => {
		if (!config.url?.includes('/login') && !config.url?.includes('/register')) {
			const token = getTokenFromStorage();
			if (token) {
				config.headers.Authorization = `Bearer ${token}`;
			}
		}
		return config;
	},
	error => Promise.reject(error)
);

export default apiClient;
