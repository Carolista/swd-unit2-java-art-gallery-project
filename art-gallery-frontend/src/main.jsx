import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { AuthContextProvider } from '@context/AuthContext.jsx';
import { DataContextProvider } from '@context/DataContext.jsx';
import { ModalContextProvider } from '@context/ModalContext.jsx';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router';

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<AuthContextProvider>
			<DataContextProvider>
				<ModalContextProvider>
					<BrowserRouter>
						<App />
					</BrowserRouter>
				</ModalContextProvider>
			</DataContextProvider>
		</AuthContextProvider>
	</StrictMode>,
);
