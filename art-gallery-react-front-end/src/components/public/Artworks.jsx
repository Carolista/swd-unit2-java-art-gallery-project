import { Link } from 'react-router';
import Card from './Card';

const Artworks = ({ artworks }) => {
	let artworksJSX = artworks.map(artwork => {
		return (
			<Link to={'/artworks/' + artwork.id} key={artwork.id}>
				<Card artwork={artwork} />
			</Link>
		);
	});

	return (
		<main>
			<h1>Artworks</h1>
			<div className="main-container">{artworksJSX}</div>
		</main>
	);
};

export default Artworks;
