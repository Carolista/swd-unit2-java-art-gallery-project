import { Link, useParams } from 'react-router';

const DetailsPage = ({ artworks }) => {
	const { id } = useParams();

	const artwork = artworks.find(artwork => String(artwork.id) === id);

	// TODO: Make editable with toggled form(s) within component and add PUT request

    // TODO: Reroute to Error Page or maybe just have a message here if id is not valid

	return (
		<main className="main-content">
			<p>
				&larr; Back to <Link to="/artworks">Artworks Gallery View</Link>
			</p>
			<h2>ARTWORK DETAILS</h2>
			<div className="container">
				<div className="row">
					<div className="col-6">
						<img className="card-image" src={artwork.details.getImageURL()} />
					</div>
					<div className="col-6">
						<h4 className="mb-4 mt-2 font-bold">
							{artwork.title + ' (' + artwork.details.yearCreated + ')'}
						</h4>
						<>
							<h5>Artist</h5>
							<p>
								{artwork.artist.getFullName()} &mdash; {artwork.artist.location}
							</p>
						</>
						{artwork.details.description != '' && (
							<>
								<h5>Description</h5>
								<p>{artwork.details.description}</p>
							</>
						)}
						<>
							<h5>
								{artwork.categories.length === 1 ? 'Category' : 'Categories'}
							</h5>
							<p>{artwork.getFormattedCategories()}</p>
						</>
						{artwork.details.media != '' && (
							<>
								<h5>Media</h5>
								<p>{artwork.details.media}</p>
							</>
						)}
						{artwork.details.getDimensions() != '' && (
							<>
								<h5>Dimensions</h5>
								<p>{artwork.details.getDimensions()}</p>
							</>
						)}
					</div>
				</div>
			</div>
		</main>
	);
};

export default DetailsPage;
