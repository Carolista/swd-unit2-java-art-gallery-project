import { createContext, useEffect, useState } from 'react';
import {
	getEmailFromStorage,
	getTokenFromStorage,
	removeTokenFromStorage,
} from '../services/storage-service';
import { validateToken } from '../services/auth-service';

const initialAuth = {
	token: getTokenFromStorage() || null,
	email: getEmailFromStorage() || null,
	isAuthenticated: false,
};

export const AuthContext = createContext(null);

export const AuthContextProvider = ({ children }) => {
	const [auth, setAuth] = useState(initialAuth);

	const checkAuthStatus = async () => {
		if (auth.token && auth.email) {
			try {
				await validateToken({ token: auth.token, email: auth.email });
				setAuth({
					token: auth.token,
					email: auth.email,
					isAuthenticated: true,
				});
			} catch (error) {
				removeTokenFromStorage();
				setAuth({ token: null, email: null, isAuthenticated: false });
			}
		}
	};

	// Checks once when app loads to see if user is known on the device
	useEffect(() => {
		checkAuthStatus();
	}, []);

	return (
		<AuthContext.Provider value={{ auth, setAuth }}>
			{children}
		</AuthContext.Provider>
	);
};
