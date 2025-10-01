import { use } from 'react';
import { Link } from 'react-router';
import { DataContext } from '../../../context/DataContext';
import { Loading } from '../../public/exports.js';

const ArtistsList = () => {
	const { isLoading } = use(DataContext);

	if (isLoading) {
		return <Loading dataName="artists" />;
	} else {
        
		// TODO: Access fetchArtists function from context
		const { allArtists } = use(DataContext);

		/*
            TODO: Write a function to handle the fetch request for deleting an artist
            Handle errors
            After a successful DELETE, update allArtists in context
        */

		const handleDelete = id => {
			/*
                TODO: Use browser's confirm popup to ask if user is sure they want to delete
                // Include full name of artist in message
                // If confirmed, call function to delete artist and pass the id
            */
		};

		let artistRowsJSX = allArtists.map(artist => {
			return (
				<tr key={artist.id}>
					<td>{artist.id}</td>
					<td>{artist.firstName}</td>
					<td>{artist.lastName}</td>
					<td>{artist.location}</td>
					<td className="delete-icon">
						{/* Add anonymous function that will call click handler and pass in id */}
						<span>
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
