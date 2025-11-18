import { createContext, useEffect, useState } from 'react';
import { Artist, Artwork, Category, Details } from '@classes/exports.js';

export const DataContext = createContext();

export const DataContextProvider = ({ children }) => {
	const [isLoading, setIsLoading] = useState(true);

	const [allArtworks, setAllArtworks] = useState(null);
	const [currentArtworks, setCurrentArtworks] = useState(null);
	const [allArtists, setAllArtists] = useState(null);
	const [allCategories, setAllCategories] = useState(null);

	const fetchArtworks = async () => {
		const artworks = [];

		try {
			const response = await fetch('http://localhost:8080/api/artworks');

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(
					errorData.message || `ERROR - Status ${response.status}`,
				);
			} else {
				const data = await response.json();

				data.forEach(artwork => {
					let artist = new Artist(
						artwork.artist.id,
						artwork.artist.firstName,
						artwork.artist.lastName,
						artwork.artist.location,
					);
					let categories = [];
					artwork.categories.forEach(category => {
						categories.push(
							new Category(category.id, category.title),
						);
					});
					let details = new Details(
						artwork.details.id,
						artwork.details.yearCreated,
						artwork.details.media,
						artwork.details.description,
						artwork.details.height,
						artwork.details.width,
						artwork.details.depth,
						artwork.details.imageId,
					);
					let newArtwork = new Artwork(
						artwork.id,
						artwork.title,
						artist,
						categories,
						details,
					);
					artworks.push(newArtwork);
				});
			}
		} catch (error) {
			console.error(error.message);
		} finally {
			setAllArtworks(artworks);
			setCurrentArtworks(artworks);
		}
	};

	const fetchArtists = async () => {
		const artists = [];

		try {
			const response = await fetch('http://localhost:8080/api/artists');

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(
					errorData.message || `ERROR - Status ${response.status}`,
				);
			} else {
				const data = await response.json();

				data.forEach(artist => {
					let newArtist = new Artist(
						artist.id,
						artist.firstName,
						artist.lastName,
						artist.location,
					);
					artists.push(newArtist);
				});
			}
		} catch (error) {
			console.error(error.message);
		} finally {
			setAllArtists(artists);
		}
	};

	const fetchCategories = async () => {
		const categories = [];

		try {
			const response = await fetch(
				'http://localhost:8080/api/categories',
			);

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(
					errorData.message || `ERROR - Status ${response.status}`,
				);
			} else {
				const data = await response.json();

				data.forEach(category => {
					let newCategory = new Category(category.id, category.title);
					categories.push(newCategory);
				});
			}
		} catch (error) {
			console.error(error.message);
		} finally {
			setAllCategories(categories);
		}
	};

	useEffect(() => {
		fetchArtworks();
		fetchArtists();
		fetchCategories();
	}, []);

	useEffect(() => {
		if (
			allArtworks !== null &&
			allArtists !== null &&
			allCategories !== null
		) {
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
				currentArtworks,
				setCurrentArtworks,
				fetchArtworks,
				fetchArtists,
				fetchCategories,
			}}>
			{children}
		</DataContext.Provider>
	);
};
