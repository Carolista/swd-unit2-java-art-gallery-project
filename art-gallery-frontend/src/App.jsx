import { use } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import {
	ArtworksPage,
	DetailsPage,
	Footer,
	Loading,
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
import { DataContext } from './context/DataContext.jsx';

function App() {
	const { auth } = use(AuthContext);
	const { isLoading } = use(DataContext);

	return (
		<BrowserRouter>
			{!auth.isAuthenticated ? (
				<>
					<PublicHeader />
					<Routes>
						<Route path='/' element={<PublicHome />} />
						<Route path='/register' element={<RegisterPage />} />
						<Route path='/login' element={<LoginPage />} />
						<Route
							path='/artworks'
							element={isLoading ? <Loading /> : <ArtworksPage />}
						/>
						<Route
							path='/artworks/details/:id'
							element={isLoading ? <Loading /> : <DetailsPage />}
						/>
						<Route path='*' element={<Navigate to='/' />} />
					</Routes>
				</>
			) : (
				<>
					<AdminHeader />
					<Routes>
						<Route path='/' element={<Navigate to='/admin' />} />
						<Route path='/admin' element={<AdminHome />} />
						<Route
							path='/admin/artworks'
							element={isLoading ? <Loading /> : <ArtworksList />}
						/>
						<Route
							path='/admin/artworks/add'
							element={
								isLoading ? <Loading /> : <AddArtworkForm />
							}
						/>
						<Route
							path='/admin/artists'
							element={isLoading ? <Loading /> : <ArtistsList />}
						/>
						<Route
							path='/admin/artists/add'
							element={<AddArtistForm />}
						/>
						<Route
							path='/admin/categories'
							element={
								isLoading ? <Loading /> : <CategoriesList />
							}
						/>
						<Route
							path='/admin/categories/add'
							element={<AddCategoryForm />}
						/>
						<Route path='*' element={<Navigate to='/' />} />
					</Routes>
				</>
			)}
			<Footer />
		</BrowserRouter>
	);
}

export default App;
