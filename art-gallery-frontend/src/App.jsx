import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import {
	ArtworksPage,
	DetailsPage,
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
	Login,
	Register,
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
			let artist = new Artist(...artwork.artist);
			let categories = [];
			artwork.categories.forEach(category => {
				categories.push(new Category(...category));
			});
			let details = new Details(...artwork.details);
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
		if (allArtworks.length && allArtists.length && allCategories.length) {
			setLoading(false);
		}
	}, [allArtworks, allArtists, allCategories]);

	return (
		<BrowserRouter>
			<React.StrictMode>
				{!loggedIn ? (
					<>
						<PublicHeader setLoggedIn={setLoggedIn} />
						<Routes>
							<Route path="/" element={<PublicHome />} />
							<Route path="/register" element={<Register />} />
							<Route path="/login" element={<Login />} />
							{/* AboutPage */}
							{/* ContactPage */}
							<Route
								path="/artworks"
								element={
									<ArtworksPage artworks={allArtworks} loading={loading} />
								}
							/>
							<Route
								path="artworks/:id"
								element={
									<DetailsPage artworks={allArtworks} loading={loading} />
								}
							/>
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
							<Route
								path="/admin/artists"
								element={<ArtistsList artists={allArtists} loading={loading} />}
							/>
							<Route
								path="/admin/artists/add"
								element={<AddArtistForm refetch={fetchArtists} />}
							/>
							{/* EditArtistForm maybe */}
							<Route
								path="/admin/artworks"
								element={
									<ArtworksList artworks={allArtworks} loading={loading} />
								}
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
							{/* EditArtworkForm maybe */}
							<Route
								path="/admin/categories"
								element={
									<CategoriesList
										categories={allCategories}
										loading={loading}
									/>
								}
							/>
							<Route
								path="/admin/categories/add"
								element={<AddCategoryForm refetch={fetchCategories} />}
							/>
							{/* EditCategoryForm maybe */}
						</Routes>
					</>
				)}
				<Footer />
			</React.StrictMode>
		</BrowserRouter>
	);
}

export default App;
