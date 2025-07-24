import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import {
	Artworks,
	Details,
	ErrorPage,
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
import { Artist, Artwork, ArtworkDetails, Category } from './classes/exports';
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
			response = await fetch('http://localhost:8080/api/artworks');
			data = await response.json();
		} catch (e) {
			setLoading(false);
		}

		try {
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
				let details = new ArtworkDetails(
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
					details,
					artist,
					categories
				);
				artworks.push(newArtwork);
			});
		} catch (e) {
			console.log('Unable to create Artwork objects.');
		}

		setAllArtworks(artworks);
	};

	const fetchArtists = async () => {
		let artists = [];

		let response;
		let data;

		try {
			response = await fetch('http://localhost:8080/api/artists');
			data = await response.json();
		} catch (e) {
			setLoading(false);
		}

		try {
			data.forEach(artist => {
				let newArtist = new Artist(
					artist.id,
					artist.firstName,
					artist.lastName,
					artist.location
				);
				artists.push(newArtist);
			});
		} catch (e) {
			console.log('Unable to create Artist objects.');
		}

		setAllArtists(artists);
	};

	const fetchCategories = async () => {
		let categories = [];

		let response;
		let data;

		try {
			response = await fetch('http://localhost:8080/api/categories');
			data = await response.json();
		} catch (e) {
			setLoading(false);
		}

		try {
			data.forEach(category => {
				let newCategory = new Category(category.id, category.title);
				categories.push(newCategory);
			});
		} catch (e) {
			console.log('Unable to create Artist objects.');
		}

		setAllCategories(categories);
	};

	useEffect(() => {
		fetchArtworks();
		fetchArtists();
		fetchCategories();
	}, []);

	useEffect(() => {
		if (
			allArtworks.length > 0 &&
			allArtists.length > 0 &&
			allCategories.length > 0
		) {
			setLoading(false);
		}
	}, [allArtworks, allArtists, allCategories]);

	return (
		<BrowserRouter>
			<React.StrictMode>
				{loggedIn ? <AdminHeader setLoggedIn={setLoggedIn} /> : <PublicHeader setLoggedIn={setLoggedIn} />}
				{loading && <Loading />}
				{!loading && (
                    loggedIn ? (
                        <Routes>
                            <Route path="/" element={<Navigate to="/admin" />} />
                            <Route path="/admin" element={<AdminHome />} />
                            <Route path="/admin/artists" element={<ArtistsList artists={allArtists} />} />
                            <Route path="/admin/artists/add" element={<AddArtistForm />} />
                            <Route path="/admin/artworks" element={<ArtworksList artworks={allArtworks} />} />
                            <Route path="/admin/artworks/add" element={<AddArtworkForm artists={allArtists} categories={allCategories} />} />
                            <Route path="/admin/categories" element={<CategoriesList categories={allCategories} />} />
                            <Route path="/admin/categories/add" element={<AddCategoryForm />} />
                            <Route path="*" element={<Navigate to="/admin" />} />
                        </Routes>
                    ) : (
                        <Routes>
                            <Route path="/" element={<PublicHome />} />
                            <Route
                                path="/artworks"
                                element={<Artworks artworks={allArtworks} />}
                            />
                            <Route
                                path="artworks/:id"
                                element={<Details artworks={allArtworks} />}
                            />
                            <Route path="*" element={<Navigate to="/" />} />
                        </Routes>
                    )
				)}
				{!loading && !allArtworks.length && (
					<ErrorPage>
						Sorry, our collection of artwork is unavailable at this time. We're
						on it!
					</ErrorPage>
				)}
			</React.StrictMode>
		</BrowserRouter>
	);
}

export default App;
