import { Link } from 'react-router';
import Card from './Card';

const ArtworksPage = ({ artworks }) => {
	let artworksJSX = artworks.map(artwork => {
		return (
			<Link to={'/artworks/' + artwork.id} key={artwork.id}>
				<Card artwork={artwork} />
			</Link>
		);
	});

	return (
		<main className="main-content">
			<h1>Artworks</h1>
			<div className="card-container">{artworksJSX}</div>
		</main>
	);
};

export default ArtworksPage;
