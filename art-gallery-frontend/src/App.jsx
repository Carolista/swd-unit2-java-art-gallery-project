import { use } from 'react';
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
import { LoginPage, RegisterPage } from './components/auth/exports.js';
import './App.css';
import { AuthContext } from './context/AuthContext.jsx';

function App() {
	const { auth } = use(AuthContext);

	return (
		<BrowserRouter>
			{!auth.isAuthenticated ? (
				<>
					<PublicHeader />
					<Routes>
						<Route path="/" element={<PublicHome />} />
						{/* FUTURE: AboutPage */}
						{/* FUTURE: ExhibitionsPage */}
						{/* FUTURE: ContactPage */}
						<Route path="/register" element={<RegisterPage />} />
						<Route path="/login" element={<LoginPage />} />
						<Route path="/artworks" element={<ArtworksPage />} />
						<Route path="/artworks/details/:id" element={<DetailsPage />} />
						<Route path="*" element={<Navigate to="/" />} />
					</Routes>
				</>
			) : (
				<>
					<AdminHeader />
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
