import { Link } from 'react-router';
import Card from './Card';
import Loading from './Loading';

const ArtworksPage = () => {
    
	// TODO: Get isLoading and allArtworks from DataContext and replace the temporary variables below
	const isLoading = false;
	const allArtworks = [];

	if (isLoading) {
		return <Loading dataName="artworks" />;
	} else {
		let artworksJSX = [...allArtworks].map(artwork => {
			return (
				<Link to={'/artworks/details/' + artwork.id} key={artwork.id}>
					<Card artwork={artwork} />
				</Link>
			);
		});
		return (
			<main className="main-content">
				<h1>Artworks</h1>
				{allArtworks.length ? (
					<div className="card-container">{artworksJSX}</div>
				) : (
					<p>
						<em>We're sorry, there are no artworks to display at this time.</em>
					</p>
				)}
			</main>
		);
	}
};

export default ArtworksPage;
