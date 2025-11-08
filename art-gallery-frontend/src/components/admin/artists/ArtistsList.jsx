import { use, useEffect, useState } from 'react';
import { Link } from 'react-router';
import { DataContext } from '../../../context/DataContext';
import { Loading } from '../../public/exports.js';
import { AuthContext } from '../../../context/AuthContext.jsx';
import { sortObjById, sortObjByString } from '../../../shared/utils.js';
import ColumnHeading from '../../common/ColumnHeading.jsx';

const ArtistsList = () => {
	const { isLoading } = use(DataContext);

	if (isLoading) {
		return <Loading dataName="artists" />;
	} else {
		const { auth } = use(AuthContext);
		const { allArtworks, allArtists, fetchArtists } = use(DataContext);

		const [currentArtists, setCurrentArtists] = useState([...allArtists]);
		const [currentSortColumn, setCurrentSortColumn] = useState('id');

		const getNumberOfArtworksByArtist = artistId => {
			return [...allArtworks].filter(artwork => artwork.artist.id == artistId)
				.length;
		};

		useEffect(() => {
			let sortFunction =
				currentSortColumn === 'id' ? sortObjById : sortObjByString;
			let updatedArtists = sortFunction([...allArtists], currentSortColumn);
			setCurrentArtists(updatedArtists);
		}, [currentSortColumn]);

		useEffect(() => {
			setCurrentArtists([...allArtists]);
		}, [allArtists]);

		const deleteArtist = async id => {
			try {
				const response = await fetch(
					`http://localhost:8080/api/artists/delete/${id}`,
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
					fetchArtists(); // update state so list will re-render
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
                
                Artist: ${currentArtists
									.find(artist => artist.id == id)
									.getFullName()}
                `);
			if (confirmed) {
				deleteArtist(id);
			}
		};

		let artistRowsJSX = currentArtists.map(artist => {
			let numArtworks = getNumberOfArtworksByArtist(artist.id);

			const getViewArtworksJSX = () => {
				return numArtworks ? (
					<Link to="/admin/artworks" state={{ currentArtist: artist }}>
						View {numArtworks} artworks
					</Link>
				) : (
					''
				);
			};
			return (
				<tr key={artist.id}>
					<td>{artist.id}</td>
					<td>{artist.firstName}</td>
					<td>{artist.lastName}</td>
					<td>{artist.location}</td>
					<td>{getViewArtworksJSX()}</td>
					<td className="delete-icon">
						<span onClick={() => handleDelete(artist.id)}>
							<i
								className="fa-solid fa-trash-can"
								title={`Delete ${artist.getFullName()}`}></i>
						</span>
					</td>
				</tr>
			);
		});

		return (
			<main className="main-content">
				<h2>ARTISTS</h2>
				{currentArtists.length ? (
					<>
						{currentArtists.length > 10 && (
							<p>
								Add a <Link to="/admin/artists/add">new artist</Link>.
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
											setCurrent={setCurrentSortColumn}
										/>
									</th>
									<th>
										<ColumnHeading
											label="First Name"
											property="firstName"
											current={currentSortColumn}
											setCurrent={setCurrentSortColumn}
										/>
									</th>
									<th>
										<ColumnHeading
											label="Last Name"
											property="lastName"
											current={currentSortColumn}
											setCurrent={setCurrentSortColumn}
										/>
									</th>
									<th>
										<ColumnHeading
											label="Location"
											property="location"
											current={currentSortColumn}
											setCurrent={setCurrentSortColumn}
										/>
									</th>
									<th>Artworks</th>
									<th></th>
								</tr>
							</thead>
							<tbody>{artistRowsJSX}</tbody>
						</table>
						<p>
							Add a <Link to="/admin/artists/add">new artist</Link>.
						</p>
					</>
				) : (
					<p>
						<em>No artists to display.</em>
					</p>
				)}
			</main>
		);
	}
};

export default ArtistsList;
