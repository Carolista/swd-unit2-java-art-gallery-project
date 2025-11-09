const Card = ({ artwork }) => {
	return (
		<div className='card artwork-card'>
			<img
				className='card-image'
				src={artwork.details.getImageURL()}
				alt={artwork.title + ' by ' + artwork.artist.getFullName()}
			/>
			<h5>{artwork.title}</h5>
			<p className='card-artist-text'>
				{artwork.artist.getFullName()} ({artwork.details.yearCreated})
			</p>
		</div>
	);
};

export default Card;
