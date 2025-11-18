import { use } from 'react';
import { Link } from 'react-router';
import { DataContext } from '@context/DataContext';
import ArtworkCard from './ArtworkCard';
import { Main } from '@components/layout/exports';

const ArtworksPage = () => {
	const { allArtworks } = use(DataContext);

	let artworksJSX = [...allArtworks].map(artwork => {
		return (
			<Link key={artwork.id} to={'/artworks/details/' + artwork.id}>
				<ArtworkCard artwork={artwork} />
			</Link>
		);
	});
	return (
		<Main>
			<h1>Artworks</h1>
			{allArtworks.length ? (
				<div className='artwork-card-container'>{artworksJSX}</div>
			) : (
				<p>
					<em>
						We're sorry, there are no artworks to display at this
						time.
					</em>
				</p>
			)}
		</Main>
	);
};

export default ArtworksPage;
