import { Card, Spacer } from '@components/common/exports.js';

const ArtworkCard = ({ artwork }) => {
	return (
		<Card clickable={true}>
			<img
				className='artwork-card-image'
				src={artwork.details.getImageURL()}
				alt={`Image of ${artwork.title} by ${artwork.artist.getFullName()}`}
			/>
			<div className='artwork-card-text'>
				<p>{artwork.title}</p>
				<p>{artwork.artist.getFullName()}</p>
			</div>
			<Spacer marginY='10px' />
		</Card>
	);
};

export default ArtworkCard;
