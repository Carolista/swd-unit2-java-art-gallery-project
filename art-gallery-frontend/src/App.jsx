import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import {
	ArtworksPage,
	DetailsPage,
	Footer,
	PublicHeader,
	PublicHome,
} from './components/public/exports';
import {
	AdminHeader,
	AdminHome,
	AddArtistForm,
	ArtistsList,
	AddArtworkForm,
	ArtworksList,
	AddCategoryForm,
	CategoriesList,
} from './components/admin/exports';
import './App.css';
import { DataProvider } from './context/DataContext';

function App() {
	const [loggedIn, setLoggedIn] = useState(false); // TEMP until auth is implemented

	return (
		<BrowserRouter>
			<DataProvider>
				<React.StrictMode>
					{!loggedIn ? (
						<>
							<PublicHeader setLoggedIn={setLoggedIn} />
							<Routes>
								<Route path="/" element={<PublicHome />} />
								{/* FUTURE: AboutPage */}
								{/* FUTURE: ExhibitionsPage */}
								{/* FUTURE: ContactPage */}
								{/* FUTURE: RegisterPage */}
								{/* FUTURE: LoginPage */}
								<Route path="/artworks" element={<ArtworksPage />} />
								<Route path="artworks/details/:id" element={<DetailsPage />} />
								<Route path="*" element={<Navigate to="/" />} />
							</Routes>
						</>
					) : (
						<>
							<AdminHeader setLoggedIn={setLoggedIn} />
							<Routes>
								<Route path="/" element={<Navigate to="/admin" />} />
								<Route path="/admin" element={<AdminHome />} />
								<Route path="*" element={<Navigate to="/" />} />
								<Route path="/admin/artworks" element={<ArtworksList />} />
								<Route
									path="/admin/artworks/add"
									element={<AddArtworkForm />}
								/>
								{/* FUTURE: EditArtworkForm, maybe */}
								<Route path="/admin/artists" element={<ArtistsList />} />
								<Route path="/admin/artists/add" element={<AddArtistForm />} />
								{/* FUTURE: EditArtistForm, maybe */}
								<Route path="/admin/categories" element={<CategoriesList />} />
								<Route
									path="/admin/categories/add"
									element={<AddCategoryForm />}
								/>
								{/* FUTURE: EditCategoryForm, maybe */}
							</Routes>
						</>
					)}
					<Footer />
				</React.StrictMode>
			</DataProvider>
		</BrowserRouter>
	);
}

export default App;
