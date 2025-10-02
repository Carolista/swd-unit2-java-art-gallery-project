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
import { useState } from 'react';

// TODO #7 - Access auth from context and replace loggedIn with auth.isAuthenticated

function App() {
    const [loggedIn, setLoggedIn] = useState(false); // TEMP until auth is implemented

	return (
		<BrowserRouter>
			{!loggedIn ? (
				<>
                    {/* TODO #7 - remove prop on PublicHeader */}
					<PublicHeader setLoggedIn={setLoggedIn} />
					<Routes>
						<Route path="/" element={<PublicHome />} />
                        {/* TODO #7 - Add routes for /login and /register */}
						<Route path="/artworks" element={<ArtworksPage />} />
						<Route path="/artworks/details/:id" element={<DetailsPage />} />
						<Route path="*" element={<Navigate to="/" />} />
					</Routes>
				</>
			) : (
				<>
                    {/* TODO #7 - remove prop on AdminHeader */}
					<AdminHeader setLoggedIn={setLoggedIn} />
					<Routes>
						<Route path="/" element={<Navigate to="/admin" />} />
						<Route path="/admin" element={<AdminHome />} />
						<Route path="/admin/artworks" element={<ArtworksList />} />
						<Route path="/admin/artworks/add" element={<AddArtworkForm />} />
						<Route path="/admin/artists" element={<ArtistsList />} />
						<Route path="/admin/artists/add" element={<AddArtistForm />} />
						<Route path="/admin/categories" element={<CategoriesList />} />
						<Route path="/admin/categories/add" element={<AddCategoryForm />} />
						<Route path="*" element={<Navigate to="/" />} />
					</Routes>
				</>
			)}
			<Footer />
		</BrowserRouter>
	);
}

export default App;
