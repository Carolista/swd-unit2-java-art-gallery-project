import { Link } from 'react-router';

const ArtworksList = ({ artworks }) => {
	// Subcomponent for immediate use
	const ArtworkRow = ({ artwork }) => {
		return (
			<tr>
				<td>{artwork.id}</td>
				<td>{artwork.title}</td>
				<td>{artwork.artist.getFullName()}</td>
				<td>{artwork.details.yearCreated}</td>
				<td>
                    <img src={artwork.details.getImageURL()} width="50px" />
				</td>
			</tr>
		);
	};

	let artworksJSX = artworks.map(artwork => {
		return <ArtworkRow key={artwork.id} artwork={artwork} />;
	});

	return (
		<main>
			<h2>ARTWORKS</h2>
			{artworks.length ? (
				<>
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
};

export default ArtworksList;
