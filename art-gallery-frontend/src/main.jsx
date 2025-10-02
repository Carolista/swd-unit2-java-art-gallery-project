import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { DataContextProvider } from './context/DataContext.jsx';
import App from './App.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
	<StrictMode>
        <DataContextProvider>
            <App />
        </DataContextProvider>
	</StrictMode>
);

// TODO #1 - Add axios dependency with npm

// TODO #2 - Add services for calls to auth back end and localStorage

// TODO #3 - Add config/api-client

// TODO #4 - Add AuthContext

// TODO #5 - Add PasswordInput, LoginPage, and RegisterPage components

// TODO #6 - Add AuthContext Provider above