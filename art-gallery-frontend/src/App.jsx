import { use } from 'react';
import { Routes, Route, Navigate } from 'react-router';
import { AuthContext } from '@context/AuthContext.jsx';
import { DataContext } from '@context/DataContext.jsx';
import { Footer, Header, SkipLink } from '@components/layout/exports.js';
import {
	AboutPage,
	ArtworkDetailsPage,
	ArtworksPage,
	LoadingPage,
	LocationPage,
	LoginPage,
	PublicHomePage,
} from '@components/pages/public/exports';
import {
	AddArtistForm,
	AddArtworkForm,
	AddCategoryForm,
	AdminHomePage,
	ArtistsList,
	ArtworksList,
	CategoriesList,
} from '@components/pages/admin/exports';

// FIXME: Admin paths not being matched when url changed manually in address bar

function App() {
	const { auth } = use(AuthContext);
	const { isLoading } = use(DataContext);

	return (
		<div id='body-container'>
			<SkipLink />
			<Header />
			{!auth.isAuthenticated ? (
				<Routes>
					<Route path='/' element={<PublicHomePage />} />
					<Route path='/about' element={<AboutPage />} />
					<Route path='/login' element={<LoginPage />} />
					<Route
						path='/artworks'
						element={isLoading ? <LoadingPage /> : <ArtworksPage />}
					/>
					<Route
						path='/artworks/details/:id'
						element={
							isLoading ? <LoadingPage /> : <ArtworkDetailsPage />
						}
					/>
					<Route path='/location' element={<LocationPage />} />
					<Route path='*' element={<Navigate to='/' />} />
				</Routes>
			) : (
				<Routes>
					<Route path='/' element={<AdminHomePage />} />
					<Route
						path='/admin/artworks'
						element={isLoading ? <LoadingPage /> : <ArtworksList />}
					/>
					<Route
						path='/admin/artworks/add'
						element={
							isLoading ? <LoadingPage /> : <AddArtworkForm />
						}
					/>
					<Route
						path='/admin/artists'
						element={isLoading ? <LoadingPage /> : <ArtistsList />}
					/>
					<Route
						path='/admin/artists/add'
						element={<AddArtistForm />}
					/>
					<Route
						path='/admin/categories'
						element={
							isLoading ? <LoadingPage /> : <CategoriesList />
						}
					/>
					<Route
						path='/admin/categories/add'
						element={<AddCategoryForm />}
					/>
					<Route path='*' element={<Navigate to='/' />} />
				</Routes>
			)}
			<Footer />
		</div>
	);
}

export default App;
