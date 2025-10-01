import { use } from 'react';
import { Link } from 'react-router';
import { DataContext } from '../../../context/DataContext';
import { Loading } from '../../public/exports.js';

const ArtworksList = () => {
	const { isLoading } = use(DataContext);

	if (isLoading) {
		return <Loading dataName="artworks" />;
	} else {
        
		// TODO: Access fetchArtworks function from context
		const { allArtworks } = use(DataContext);

		/*
            TODO: Write a function to handle the fetch request for deleting an artwork
            Handle errors
            After a successful DELETE, update allArtworks in context
        */

		const handleDelete = id => {
			/*
                TODO: Use browser's confirm popup to ask if user is sure they want to delete
                // Include artwork title in message
                // If confirmed, call function to delete artwork and pass the id
            */
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
						{/* Add anonymous function that will call click handler and pass in id */}
						<span>
							<i
								className="fa-solid fa-trash-can"
								title={`Delete ${artwork.title}`}></i>
						</span>
					</td>
				</tr>
			);
		});

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
									<th></th>
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
