import { use } from 'react';
import { Link } from 'react-router';
import { DataContext } from '../../../context/DataContext';
import Loading from '../../public/Loading';

const ArtworksList = () => {
	const { isLoading } = use(DataContext);

	if (isLoading) {
		return <Loading dataName="artworks" />;
	} else {
		const { allArtworks, fetchArtworks } = use(DataContext);

		const deleteArtwork = async id => {
			try {
				const response = await fetch(
					`http://localhost:8080/api/artworks/delete/${id}`,
					{
						method: 'DELETE',
						headers: {
							'Access-Control-Allow-Origin': '*',
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
					// FUTURE: Confirm with toast or banner after successful delete
				}
			} catch (error) {
				console.error(error.message);

				// FUTURE: Use toast or banner to notify user that deletion was unsuccessful
			}
		};
		const handleDelete = id => {
			// FUTURE: Use modal instead of alert
			let confirmed = confirm(`
                Are you sure you want to delete this record?
                
                Artwork: ${allArtworks.find(artwork => artwork.id == id).title}
                `);
			if (confirmed) {
				deleteArtwork(id);
			}
		};

		let artworksJSX = allArtworks.map(artwork => {
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

		// FUTURE: Add sort by column
		// FUTURE: Add filter by artist and filter by category

		return (
			<main className="main-content">
				<h2>ARTWORKS</h2>
				{allArtworks.length ? (
					<>
						{allArtworks.length > 10 && (
							<p>
								Add a <Link to="/admin/artworks/add">new artwork</Link>.
							</p>
						)}
						<table className="table table-striped">
							<thead>
								<tr>
									<th>ID</th>
									<th>Title</th>
									<th>Artist</th>
									<th>Year Created</th>
									<th>Image</th>
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
