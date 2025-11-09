import { use } from 'react';
import { Link } from 'react-router';
import { DataContext } from '../../context/DataContext';
import Card from './Card';
import Loading from './Loading';

const ArtworksPage = () => {
	const { isLoading, allArtworks } = use(DataContext);

	if (isLoading) {
		return <Loading dataName='artworks' />;
	} else {
		let artworksJSX = [...allArtworks].map(artwork => {
			return (
				<Link to={'/artworks/details/' + artwork.id} key={artwork.id}>
					<Card artwork={artwork} />
				</Link>
			);
		});
		return (
			<main className='main-content'>
				<h1>Artworks</h1>
				{allArtworks.length ? (
					<div className='card-container'>{artworksJSX}</div>
				) : (
					<p>
						<em>
							We're sorry, there are no artworks to display at
							this time.
						</em>
					</p>
				)}
			</main>
		);
	}
};

export default ArtworksPage;
