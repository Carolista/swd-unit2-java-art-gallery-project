import { use, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router';
import { DataContext } from '../../../context/DataContext';
import { Loading } from '../../public/exports.js';
import { AuthContext } from '../../../context/AuthContext.jsx';
import { sortObjById, sortObjByString } from '../../../shared/utils.js';
import ColumnHeading from '../../common/ColumnHeading.jsx';

const ArtworksList = () => {
	const { isLoading } = use(DataContext);

	if (isLoading) {
		return <Loading dataName="artworks" />;
	} else {
		const { auth } = use(AuthContext);
		const { allArtworks, currentArtworks, setCurrentArtworks, fetchArtworks } =
			use(DataContext);

		const location = useLocation();
		const { currentArtist, currentCategory } = location.state || {};

		const [currentSortColumn, setCurrentSortColumn] = useState('id');

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
			setCurrentArtworks(allArtworks);
			filterArtworks();
		}, [allArtworks]);

		useEffect(() => {
			filterArtworks();
		}, [currentArtist, currentCategory]);

		const handleSortByColumn = column => {
			let updatedArtworks;
			switch (column) {
				case 'id':
					updatedArtworks = sortObjById([...currentArtworks], 'id');
					break;
				case 'title':
					updatedArtworks = sortObjByString([...currentArtworks], 'title');
					break;
				case 'artist':
					updatedArtworks = sortObjByString(
						[...currentArtworks],
						'artist',
						'lastName'
					);
					break;
				case 'year':
					updatedArtworks = sortObjByString(
						[...currentArtworks],
						'details',
						'yearCreated'
					);
			}
			setCurrentSortColumn(column);
			setCurrentArtworks(updatedArtworks);
		};

		const handleResetArtworks = () => {
			setCurrentArtworks(allArtworks);
		};

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
					fetchArtworks();
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
						<img src={artwork.details.getImageURL()} width="50px" alt={artwork.title + " by " + artwork.artist.getFullName()} />
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
					ARTWORKS
					{currentCategory && ` (${currentCategory.title})`}
					{currentArtist &&
						` (${currentArtist.firstName[0]}. ${currentArtist.lastName})`}
				</h2>
				{currentArtworks.length ? (
					<>
						{currentArtworks.length < allArtworks.length && (
							<p>
								<em>
									Displaying {currentArtworks.length} of {allArtworks.length}{' '}
									artworks.
								</em>{' '}
								<Link to="/admin/artworks" onClick={handleResetArtworks}>
									View All
								</Link>
							</p>
						)}
						<table className="table table-striped">
							<thead>
								<tr>
									<th width="100px">
										<ColumnHeading
											label="ID"
											property="id"
											current={currentSortColumn}
											setCurrent={handleSortByColumn}
										/>
									</th>
									<th>
										<ColumnHeading
											label="Title"
											property="title"
											current={currentSortColumn}
											setCurrent={handleSortByColumn}
										/>
									</th>
									<th>
										<ColumnHeading
											label="Artist"
											property="artist"
											current={currentSortColumn}
											setCurrent={handleSortByColumn}
										/>
									</th>
									<th>
										<ColumnHeading
											label="Created"
											property="year"
											current={currentSortColumn}
											setCurrent={handleSortByColumn}
										/>
									</th>
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
