import { use } from 'react';
import { DataContext } from '../../../context/DataContext';
import Loading from '../../public/Loading';

const ArtistsList = () => {
	const { isLoading } = use(DataContext);

	if (isLoading) {
		return <Loading dataName="artists" />;
	} else {
		const { allArtists } = use(DataContext);

		let artistRowsJSX = allArtists.map(artist => {
			return (
				<tr key={artist.id}>
					<td>{artist.id}</td>
					<td>{artist.firstName}</td>
					<td>{artist.lastName}</td>
					<td>{artist.location}</td>
				</tr>
			);
		});

		return (
			<main className="main-content">
				<h2>ARTISTS</h2>
				{allArtists.length ? (
					<>
						<table className="table table-striped">
							<thead>
								<tr>
									<th>ID</th>
									<th>First Name</th>
									<th>Last Name</th>
									<th>Location</th>
								</tr>
							</thead>
							<tbody>{artistRowsJSX}</tbody>
						</table>
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
