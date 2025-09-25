import { createContext, useEffect, useState } from 'react';
import Artist from '../classes/Artist';
import Category from '../classes/Category';
import Details from '../classes/Details';
import Artwork from '../classes/Artwork';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
	const [isLoading, setIsLoading] = useState(true);

	const [allArtworks, setAllArtworks] = useState(null);
	const [allArtists, setAllArtists] = useState(null);
	const [allCategories, setAllCategories] = useState(null);

	const fetchArtworks = async () => {
		let artworks = [];
		let response;
		let data;

		try {
			// response = await fetch('./test-data/artworks.json');
			response = await fetch('http://localhost:8080/api/artworks');
			data = await response.json();
		} catch (error) {
			console.error('Unable to fetch artworks...', error.message);
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
				artwork.details.height,
				artwork.details.width,
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
			console.error('Unable to fetch artists...', error.message);
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
			console.error('Unable to fetch categories...', error.message);
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
		if (allArtworks !== null && allArtists !== null && allCategories !== null) {
			setIsLoading(false);
		}
	}, [allArtworks, allArtists, allCategories]);

	return (
		<DataContext.Provider
			value={{
				isLoading,
				allArtworks,
				allArtists,
				allCategories,
				fetchArtworks,
				fetchArtists,
				fetchCategories,
			}}>
			{children}
		</DataContext.Provider>
	);
};
