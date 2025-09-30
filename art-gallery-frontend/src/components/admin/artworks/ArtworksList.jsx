import { use } from 'react';
import { Link } from 'react-router';
import { DataContext } from '../../../context/DataContext';
import Loading from '../../public/Loading';

const ArtworksList = () => {
	const { isLoading } = use(DataContext);

	if (isLoading) {
		return <Loading dataName="artworks" />;
	} else {
		const { allArtworks } = use(DataContext);

        // TODO: Write a function to make a DELETE call to remove an artwork by id
        // Include try/catch to handle error objects in response (similar to GET requests in DataContext)
        // If response is OK, re-fetch artists so that state variable will hold updated list
        // (at which point the page will re-render automatically)


        // TODO: Write a handler function that confirms the user's intent to delete the record
        // and, if so, passes the id to the function above to make the DELETE request


        // TODO: Add a trash can icon in a sixth column tied to a click handler for deleting that record

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
                                    {/* TODO: Add a sixth column header for consistency; it can be blank */}
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
