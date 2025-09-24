import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import {
	ArtworksPage,
	DetailsPage,
	ErrorPage,
	Footer,
	Loading,
	PublicHeader,
	PublicHome,
} from './components/public/_exports';
import {
	AdminHeader,
	AdminHome,
	AddArtistForm,
	ArtistsList,
	AddArtworkForm,
	ArtworksList,
	AddCategoryForm,
	CategoriesList,
} from './components/admin/_exports';
import { Artist, Artwork, Details, Category } from './classes/_exports';
import './App.css';

function App() {
	const [loading, setLoading] = useState(true);
	const [loggedIn, setLoggedIn] = useState(false); // TEMP until auth is implemented

	const [allArtworks, setAllArtworks] = useState([]);
	const [allArtists, setAllArtists] = useState([]);
	const [allCategories, setAllCategories] = useState([]);

	const fetchArtworks = async () => {
		let artworks = [];

		let response;
		let data;

		try {
			// response = await fetch('./test-data/artworks.json');
			response = await fetch('http://localhost:8080/api/artworks');
			data = await response.json();
		} catch (error) {
			console.error(error.message);
			setLoading(false);
		}

		data.forEach(artwork => {
			let artist = new Artist(
				artwork.artist.id,
				artwork.artist.firstName,
				artwork.artist.lastName,
				artwork.artist.location
			);
			let categories = [];
			artwork.categories.forEach(category => {
				categories.push(new Category(category.id, category.title));
			});
			let details = new Details(
				artwork.details.id,
				artwork.details.media,
				artwork.details.yearCreated,
				artwork.details.description,
				artwork.details.width,
				artwork.details.height,
				artwork.details.depth,
				artwork.details.imageId
			);
			let newArtwork = new Artwork(
				artwork.id,
				artwork.title,
				artist,
				categories,
				details
			);
			artworks.push(newArtwork);
		});

		setAllArtworks(artworks);
	};

	const fetchArtists = async () => {
		let artists = [];

		let response;
		let data;

		try {
			response = await fetch('http://localhost:8080/api/artists');
			// response = await fetch('./test-data/artists.json');
			data = await response.json();
		} catch (error) {
			console.error(error.message);
			setLoading(false);
		}

		data.forEach(artist => {
			let newArtist = new Artist(
				artist.id,
				artist.firstName,
				artist.lastName,
				artist.location
			);
			artists.push(newArtist);
		});

		setAllArtists(artists);
	};

	const fetchCategories = async () => {
		let categories = [];

		let response;
		let data;

		try {
			response = await fetch('http://localhost:8080/api/categories');
			// response = await fetch('./test-data/categories.json');
			data = await response.json();
		} catch (error) {
			console.error(error.message);
			setLoading(false);
		}

		data.forEach(category => {
			let newCategory = new Category(category.id, category.title);
			categories.push(newCategory);
		});

		setAllCategories(categories);
	};

	useEffect(() => {
		fetchArtworks();
		fetchArtists();
		fetchCategories();
	}, []);

	useEffect(() => {
		if (
			allArtworks.length &&
			allArtists.length &&
			allCategories.length
		) {
			setLoading(false);
		}
	}, [allArtworks, allArtists, allCategories]);

    // FIXME TODO: Make sure routing makes sense for all logical combinations, especially pages used for both public and admin
    // TODO: Create delete pages for artist, category, and artwork

	return (
		<BrowserRouter>
			<React.StrictMode>
				{loggedIn ? (
					<AdminHeader setLoggedIn={setLoggedIn} />
				) : (
					<PublicHeader setLoggedIn={setLoggedIn} />
				)}
				{loading && <Loading />}
				{!loading &&
					(loggedIn ? (
						<Routes>
							<Route path="/" element={<Navigate to="/admin" />} />
							<Route path="/admin" element={<AdminHome />} />
							<Route
								path="/admin/artists"
								element={<ArtistsList artists={allArtists} />}
							/>
							<Route
								path="/admin/artists/add"
								element={<AddArtistForm refetch={fetchArtists} />}
							/>
							<Route
								path="/admin/artworks"
								element={<ArtworksList artworks={allArtworks} />}
							/>
							<Route
								path="/admin/artworks/add"
								element={
									<AddArtworkForm
										artists={allArtists}
										categories={allCategories}
										refetch={fetchArtworks}
									/>
								}
							/>
							<Route
								path="/admin/categories"
								element={<CategoriesList categories={allCategories} />}
							/>
							<Route
								path="/admin/categories/add"
								element={<AddCategoryForm refetch={fetchCategories} />}
							/>
							<Route path="*" element={<Navigate to="/admin" />} />
						</Routes>
					) : (
						<Routes>
							<Route path="/" element={<PublicHome />} />
							<Route
								path="/artworks"
								element={<ArtworksPage artworks={allArtworks} />}
							/>
							<Route
								path="artworks/:id"
								element={<DetailsPage artworks={allArtworks} />}
							/>
							<Route path="*" element={<Navigate to="/" />} />
						</Routes>
					))}
				{/* {!loading && !allArtworks.length && (
					<ErrorPage>
						Sorry, our collection of artwork is unavailable at this time. We're
						on it!
					</ErrorPage>
				)} */}
                <Footer />
			</React.StrictMode>
		</BrowserRouter>
	);
}

export default App;
