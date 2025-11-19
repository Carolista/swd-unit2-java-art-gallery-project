import axios from 'axios';
import { getTokenFromStorage } from '@services/storageService';

const apiClient = axios.create({ baseURL: 'http://localhost:8080/api' });

// TODO: Remove /register from exclusion once auth roles implemented
// TODO: Use Axios consistently throughout app
apiClient.interceptors.request.use(
	config => {
		if (
			!config.url?.includes('/login') &&
			!config.url?.includes('/register')
		) {
			const token = getTokenFromStorage();
			if (token) {
				config.headers.Authorization = `Bearer ${token}`;
			}
		}
		return config;
	},
	error => Promise.reject(error),
);

export default apiClient;
