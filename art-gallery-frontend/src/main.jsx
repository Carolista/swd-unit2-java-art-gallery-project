import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { AuthContextProvider } from './context/AuthContext.jsx';
import { DataContextProvider } from './context/DataContext.jsx';
import App from './App.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<AuthContextProvider>
			<DataContextProvider>
				<App />
			</DataContextProvider>
		</AuthContextProvider>
	</StrictMode>
);
