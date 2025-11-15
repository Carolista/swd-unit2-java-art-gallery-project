import { use, useEffect, useState } from 'react';
import { Link } from 'react-router';
import { AuthContext } from '@context/AuthContext';
import { DataContext } from '@context/DataContext';
import useScreenWidth from '@hooks/useScreenWidth';
import { sortObjById, sortObjByString } from '@shared/utils.js';
import {
	ColumnHeading,
	SortableColumnHeading,
} from '@components/common/exports.js';
import { Main } from '@components/layout/exports';

const ArtistsList = () => {
	const { auth } = use(AuthContext);
	const { allArtworks, allArtists, fetchArtists } = use(DataContext);

	const screenWidth = useScreenWidth();

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
	}, [currentSortColumn, allArtists]);

	useEffect(() => {
		setCurrentArtists([...allArtists]);
	}, [allArtists]);

	const deleteArtist = async id => {
		try {
			const response = await fetch(
				`http://localhost:8080/api/artists/delete/${id}`,
				{
					method: 'DELETE',
					headers: { Authorization: 'Bearer ' + auth.token },
				},
			);
			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(
					errorData.message || `ERROR - Status ${response.status}`,
				);
			} else {
				fetchArtists();
			}
		} catch (error) {
			console.error(error.message);
		} finally {
			// TODO: Use toast or banner to notify user of success or failure
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
				<Link to='/admin/artworks' state={{ currentArtist: artist }}>
					View {numArtworks} artworks
				</Link>
			) : (
				''
			);
		};
		return (
			<tr key={artist.id}>
				<td className='align-right'>{artist.id}</td>
				<td className='align-right'>{artist.firstName}</td>
				<td>{artist.lastName}</td>
				<td>{artist.location}</td>
				<td>{getViewArtworksJSX()}</td>
				<td className='delete-icon'>
					<span onClick={() => handleDelete(artist.id)}>
						<i
							className='fa-solid fa-trash-can'
							title={`Delete ${artist.getFullName()}`}></i>
					</span>
				</td>
			</tr>
		);
	});

	return (
		<Main>
			<h2>ARTISTS</h2>
			<p>
				Add a <Link to='/admin/artists/add'>new artist</Link>.
			</p>
			{screenWidth < 768 ? (
				<p>Please increase screen width to view the table.</p>
			) : currentArtists.length ? (
				<>
					<table className='table table-striped'>
						<thead>
							<tr>
								<SortableColumnHeading
									id='ID'
									classes='align-right'
									property='id'
									current={currentSortColumn}
									setCurrent={setCurrentSortColumn}>
									ID
								</SortableColumnHeading>
								<SortableColumnHeading
									id='firstName'
									classes='align-right'
									property='firstName'
									current={currentSortColumn}
									setCurrent={setCurrentSortColumn}>
									First Name
								</SortableColumnHeading>
								<SortableColumnHeading
									id='lastName'
									property='lastName'
									current={currentSortColumn}
									setCurrent={setCurrentSortColumn}>
									Last Name
								</SortableColumnHeading>
								<SortableColumnHeading
									id='location'
									label='Location'
									property='location'
									current={currentSortColumn}
									setCurrent={setCurrentSortColumn}>
									Location
								</SortableColumnHeading>
								<ColumnHeading id='artworks'>
									Artworks
								</ColumnHeading>
								<ColumnHeading id='delete'>
									<i
										className='fa-solid fa-trash-can'
										title='Delete'></i>
								</ColumnHeading>
							</tr>
						</thead>
						<tbody>{artistRowsJSX}</tbody>
					</table>

					{currentArtists.length > 10 && (
						<p>
							Add a{' '}
							<Link to='/admin/artists/add'>new artist</Link>.
						</p>
					)}
				</>
			) : (
				<p>
					<em>No artists to display.</em>
				</p>
			)}
		</Main>
	);
};

export default ArtistsList;
