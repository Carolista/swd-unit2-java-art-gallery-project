import { use } from 'react';
import { Link } from 'react-router';
import { DataContext } from '../../../context/DataContext';
import Loading from '../../public/Loading';

const ArtistsList = () => {
	const { isLoading } = use(DataContext);

	if (isLoading) {
		return <Loading dataName="artists" />;
	} else {
		const { allArtists } = use(DataContext);

        const handleDelete = id => {
            // TODO: Use alert (or modal) to confirm deletion before allowing fetch request
            // TODO: Make DELETE call
            // TODO: Notify with toast or banner if unsuccessful
            // TODO: Confirm with toast or banner after successful delete 
            console.log("This will eventually delete the artist with id " + id)
        }

		let artistRowsJSX = allArtists.map(artist => {
			return (
				<tr key={artist.id}>
					<td>{artist.id}</td>
					<td>{artist.firstName}</td>
					<td>{artist.lastName}</td>
					<td>{artist.location}</td>
                    <td className="delete-icon"><span onClick={() => handleDelete(artist.id)}><i className="fa-solid fa-trash-can" title={`Delete ${artist.getFullName()}`}></i></span></td>
				</tr>
			);
		});

		// FUTURE: Add sort by column
		// FUTURE: Add links to view artworks by artist

		return (
			<main className="main-content">
				<h2>ARTISTS</h2>
				{allArtists.length ? (
					<>
						{allArtists.length > 10 && (
							<p>
								Add a <Link to="/admin/artists/add">new artist</Link>.
							</p>
						)}
						<table className="table table-striped">
							<thead>
								<tr>
									<th>ID</th>
									<th>First Name</th>
									<th>Last Name</th>
									<th>Location</th>
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
