import { Link } from "react-router";

const ArtistsList = ({ artists }) => {
	let artistRowsJSX = artists.map(artist => {
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
		<main>
			<h2>ARTISTS</h2>
			{artists.length ? (
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
                    <p>Add a <Link to="/admin/artists/add" >new artist</Link>.</p>
                </>
			) : (
				<p>
					<em>No artists to display.</em>
				</p>
			)}
            
		</main>
	);
};

export default ArtistsList;
