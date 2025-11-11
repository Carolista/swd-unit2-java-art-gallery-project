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
				<h5>{artwork.title}</h5>
				<h6>{artwork.artist.getFullName()}</h6>
			</div>
			<Spacer marginY='10px' />
		</Card>
	);
};

export default ArtworkCard;
