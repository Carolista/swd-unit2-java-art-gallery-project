import { use } from 'react';
import { Routes, Route, Navigate } from 'react-router';
import { AuthContext } from '@context/AuthContext.jsx';
import { DataContext } from '@context/DataContext.jsx';
import { Footer, Header } from '@components/layout/exports.js';
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

// FIXME: Admin paths not being matched when url changed in address bar
// FIXME: Error messages on login form not displaying?
// FIXME: Error message on artist select on artworks form not displaying? Perhaps not even validating properly?

// TODO: Ensure all forms have responsive layout and check definitions of container classes in Form
//  (remove all Bootstrap classes previously used)
// TODO: Ensure ArtworkDetailsPage has responsive layout (side-by-side on larger desktop displays)
// TODO: Use submitting state variable on all forms and add to buttonData for shouldDisable prop
// TODO: Check use of 'required' passed as prop on all forms for accessibility
// TODO: See if anything else could benefit from CSS variables

function App() {
	const { auth } = use(AuthContext);
	const { isLoading } = use(DataContext);

	return (
		<div id='body-container'>
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
					<Route path='/admin' element={<AdminHomePage />} />
                    <Route path='/' element={<Navigate to='/admin' />} end />
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
