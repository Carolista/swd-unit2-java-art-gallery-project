import { use, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router';
import { DataContext } from '../../../context/DataContext';
import { Loading } from '../../public/exports.js';
import { AuthContext } from '../../../context/AuthContext.jsx';
import { sortObjById, sortObjByString } from '../../../shared/utils.js';

const ArtworksList = () => {
	const { isLoading } = use(DataContext);

	if (isLoading) {
		return <Loading dataName="artworks" />;
	} else {
		const { auth } = use(AuthContext);
		const { allArtworks, fetchArtworks } = use(DataContext);

		const [currentArtworks, setCurrentArtworks] = useState([...allArtworks]);
		const [currentSortColumn, setCurrentSortColumn] = useState('title');

		const location = useLocation();
		const { currentArtist, currentCategory } = location.state || {};

		const filterArtworks = () => {
			if (currentArtist) {
				const filteredArtworks = allArtworks.filter(
					artwork => artwork.artist.id == currentArtist.id
				);
				setCurrentArtworks(filteredArtworks);
			}
			if (currentCategory) {
				const filteredArtworks = allArtworks.filter(artwork =>
					artwork.categories
						.map(category => category.id)
						.includes(currentCategory.id)
				);
				setCurrentArtworks(filteredArtworks);
			}
		};

		useEffect(() => {
			let sortFunction =
				currentSortColumn === 'id' ? sortObjById : sortObjByString;
			// FIXME: Not working for currentArtworks
			let updatedArtworks = sortFunction([...allArtworks], currentSortColumn);
			setCurrentArtworks(updatedArtworks);
		}, [currentSortColumn]);

		useEffect(() => {
			setCurrentArtworks(allArtworks);
			filterArtworks();
		}, [allArtworks]);

		useEffect(() => {
			filterArtworks();
		}, [currentArtist, currentCategory]);

		const deleteArtwork = async id => {
			try {
				const response = await fetch(
					`http://localhost:8080/api/artworks/delete/${id}`,
					{
						method: 'DELETE',
						headers: {
							Authorization: 'Bearer ' + auth.token,
						},
					}
				);
				if (!response.ok) {
					const errorData = await response.json();
					throw new Error(
						errorData.message || `ERROR - Status ${response.status}`
					);
				} else {
					fetchArtworks(); // update state so list will update
				}
			} catch (error) {
				console.error(error.message);
			} finally {
				// Use toast or banner to notify user of success or failure
				// Could have various specific outcomes depending on type of error
			}
		};
		const handleDelete = id => {
			let confirmed = confirm(`
                Are you sure you want to delete this record?
                
                Artwork: ${allArtworks.find(artwork => artwork.id == id).title}
                `);
			if (confirmed) {
				deleteArtwork(id);
			}
		};

		let artworksJSX = currentArtworks.map(artwork => {
			return (
				<tr key={artwork.id}>
					<td>{artwork.id}</td>
					<td>{artwork.title}</td>
					<td>{artwork.artist.getFullName()}</td>
					<td>{artwork.details.yearCreated}</td>
					<td>
						<img src={artwork.details.getImageURL()} width="50px" />
					</td>
					<td className="delete-icon">
						<span onClick={() => handleDelete(artwork.id)}>
							<i
								className="fa-solid fa-trash-can"
								title={`Delete ${artwork.title}`}></i>
						</span>
					</td>
				</tr>
			);
		});

		return (
			<main className="main-content">
				<h2>
					{currentCategory && `${currentCategory.title} `}
					ARTWORKS
					{currentArtist &&
						` by ${currentArtist.firstName[0]}. ${currentArtist.lastName}`}
				</h2>
				{currentArtworks.length ? (
					<>
						{currentArtworks.length > 10 && (
							<p>
								Add a <Link to="/admin/artworks/add">new artwork</Link>.
							</p>
						)}
						<table className="table table-striped">
							<thead>
								<tr>
									<th>
										<span
											className="sortable"
											onClick={() => setCurrentSortColumn('id')}>
											ID
										</span>
									</th>
									<th>
										<span
											className="sortable"
											onClick={() => setCurrentSortColumn('title')}>
											Title
										</span>
									</th>
									<th>Artist</th>
									<th>Created</th>
									<th>Image</th>
									<th></th>
								</tr>
							</thead>
							<tbody>{artworksJSX}</tbody>
						</table>
						<p>
							Add a <Link to="/admin/artworks/add">new artwork</Link>.
						</p>
					</>
				) : (
					<p>
						<em>No artworks to display.</em>
					</p>
				)}
			</main>
		);
	}
};

export default ArtworksList;
