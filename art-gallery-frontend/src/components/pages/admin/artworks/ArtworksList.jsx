import { use, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router';
import { AuthContext } from '@context/AuthContext.jsx';
import { DataContext } from '@context/DataContext';
import useScreenWidth from '@hooks/useScreenWidth';
import { sortObjById, sortObjByString } from '@shared/utils.js';
import {
	ColumnHeading,
	SortableColumnHeading,
} from '@components/common/exports.js';
import { Main } from '@components/layout/exports';

const ArtworksList = () => {
	const { auth } = use(AuthContext);
	const { allArtworks, currentArtworks, setCurrentArtworks, fetchArtworks } =
		use(DataContext);

	const screenWidth = useScreenWidth();

	const location = useLocation();
	const { currentArtist, currentCategory } = location.state || {};

	const [currentSortColumn, setCurrentSortColumn] = useState('id');

	const filterArtworks = () => {
		if (currentArtist) {
			const filteredArtworks = allArtworks.filter(
				artwork => artwork.artist.id == currentArtist.id,
			);
			setCurrentArtworks(filteredArtworks);
		}
		if (currentCategory) {
			const filteredArtworks = allArtworks.filter(artwork =>
				artwork.categories
					.map(category => category.id)
					.includes(currentCategory.id),
			);
			setCurrentArtworks(filteredArtworks);
		}
	};

	useEffect(() => {
		setCurrentArtworks(allArtworks);
		filterArtworks();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [allArtworks]);

	useEffect(() => {
		filterArtworks();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentArtist, currentCategory]);

	const handleSortByColumn = column => {
		let updatedArtworks;
		switch (column) {
			case 'id':
				updatedArtworks = sortObjById([...currentArtworks], 'id');
				break;
			case 'title':
				updatedArtworks = sortObjByString(
					[...currentArtworks],
					'title',
				);
				break;
			case 'artist':
				updatedArtworks = sortObjByString(
					[...currentArtworks],
					'artist',
					'lastName',
				);
				break;
			case 'year':
				updatedArtworks = sortObjByString(
					[...currentArtworks],
					'details',
					'yearCreated',
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
					headers: { Authorization: 'Bearer ' + auth.token },
				},
			);
			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(
					errorData.message || `ERROR - Status ${response.status}`,
				);
			} else {
				fetchArtworks();
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
                
                Artwork: ${allArtworks.find(artwork => artwork.id == id).title}
                `);
		if (confirmed) {
			deleteArtwork(id);
		}
	};

	// TODO: Add filter icon (or filter-circle-xmark icon) to artists' names and make clickable for filtering
	// TODO: Replace Year Created column with Categories Column and make clickable for filtering
	let artworksJSX = currentArtworks.map(artwork => {
		return (
			<tr key={artwork.id}>
				<td className='align-right'>{artwork.id}</td>
				<td>{artwork.title}</td>
				<td>{artwork.artist.getFullName()}</td>
				<td>{artwork.details.yearCreated}</td>
				<td>
					<img
						src={artwork.details.getImageURL()}
						width='50px'
						alt={
							artwork.title +
							' by ' +
							artwork.artist.getFullName()
						}
					/>
				</td>
				<td className='delete-icon'>
					<span onClick={() => handleDelete(artwork.id)}>
						<i
							className='fa-solid fa-trash-can'
							title={`Delete ${artwork.title}`}></i>
					</span>
				</td>
			</tr>
		);
	});

	return (
		<Main>
			<h1>
				Artworks
				{currentCategory && ` (${currentCategory.title})`}
				{currentArtist &&
					` (${currentArtist.firstName[0]}. ${currentArtist.lastName})`}
			</h1>
			{/* TODO: Add subnav for CRUD links */}
			<p className='above-table'>
				Add a <Link to='/admin/artworks/add'>new artwork</Link>.
			</p>
			{screenWidth < 768 ? (
				<p>Please increase screen width to view the table.</p>
			) : currentArtworks.length ? (
				<>
					{currentArtworks.length < allArtworks.length && (
						<p className='above-table'>
							<em>
								Displaying {currentArtworks.length} of{' '}
								{allArtworks.length} artworks.
							</em>{' '}
							<Link
								to='/admin/artworks'
								onClick={handleResetArtworks}>
								View All
							</Link>
						</p>
					)}
					<table className='table table-striped'>
						<thead>
							<tr>
								<SortableColumnHeading
									id='ID'
									classes='align-right'
									property='id'
									current={currentSortColumn}
									setCurrent={handleSortByColumn}>
									ID
								</SortableColumnHeading>
								<SortableColumnHeading
									id='title'
									property='title'
									current={currentSortColumn}
									setCurrent={handleSortByColumn}>
									Title
								</SortableColumnHeading>
								<SortableColumnHeading
									id='artist'
									property='artist'
									current={currentSortColumn}
									setCurrent={handleSortByColumn}>
									Artist
								</SortableColumnHeading>
								<SortableColumnHeading
									id='year'
									property='year'
									current={currentSortColumn}
									setCurrent={handleSortByColumn}>
									Created
								</SortableColumnHeading>
								<ColumnHeading id='image'>Image</ColumnHeading>
								<ColumnHeading id='delete'>
									<i
										className='fa-solid fa-trash-can'
										title='Delete'></i>
								</ColumnHeading>
							</tr>
						</thead>
						<tbody>{artworksJSX}</tbody>
					</table>
					{currentArtworks.length > 10 && (
						<p>
							Add a{' '}
							<Link to='/admin/artworks/add'>new artwork</Link>.
						</p>
					)}
				</>
			) : (
				<p>
					<em>No artworks to display.</em>
				</p>
			)}
		</Main>
	);
};

export default ArtworksList;
