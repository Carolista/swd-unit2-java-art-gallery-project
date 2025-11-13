import apiClient from '@config/api-client';

// TODO: Add for all admin requests as well

export const requestRegistration = userProfile => {
	return apiClient.post('/user/register', userProfile);
};

export const requestLogin = authRequest => {
	return apiClient.post('/user/login', authRequest);
};

export const requestLogout = () => {
	return apiClient.post('/user/logout');
};

export const validateToken = validationRequest => {
	return apiClient.post('/user/validate-token', validationRequest);
};
