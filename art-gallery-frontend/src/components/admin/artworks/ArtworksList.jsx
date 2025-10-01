import { use } from 'react';
import { Link } from 'react-router';
import { DataContext } from '../../../context/DataContext';
import Loading from '../../public/Loading';

const ArtworksList = () => {

	// TODO: Get isLoading from DataContext and replace the temporary variable below
	const isLoading = false;

	if (isLoading) {
		return <Loading dataName="artworks" />;
	} else {
		
        // TODO: Get allArtworks from DataContext and replace the temporary variable below
		const allArtworks = [];

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
				</tr>
			);
		});

		return (
			<main className="main-content">
				<h2>ARTWORKS</h2>
				{allArtworks.length ? (
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
