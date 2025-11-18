import { use } from 'react';
import { useNavigate, useParams } from 'react-router';
import { DataContext } from '@context/DataContext';
import { Main } from '@components/layout/exports';
import ErrorPage from '@components/pages/general/ErrorPage';
import { GoBack, Spacer } from '@components/common/exports';

const ArtworkDetailsPage = () => {
	const { id } = useParams();

	const { allArtworks } = use(DataContext);

	const artwork = allArtworks.find(artwork => String(artwork.id) === id);

	const navigate = useNavigate();

	const handleGoToArtworksPage = () => {
		navigate('/artworks');
	};

	if (!artwork) {
		return (
			<ErrorPage>
				{/* Photo by Angela Roma : https://www.pexels.com/photo/empty-frame-on-wooden-shelf-7319277/ */}
				<p>Sorry, that artwork does not exist!</p>
				<img
					className='image-not-found'
					src='/images/image-not-found.png'
					alt='Empty picture frame'
				/>
				<Spacer marginY='20px' />
				<GoBack
					text={'View All Artworks'}
					handleClick={handleGoToArtworksPage}
				/>
			</ErrorPage>
		);
	} else {
		return (
			<Main>
				<Spacer marginY='10px' />
				<GoBack
					text={'View All Artworks'}
					handleClick={handleGoToArtworksPage}
				/>
				<h1>Artwork Details</h1>
				<div className='artwork-details-container'>
					<div className='artwork-details-image-container'>
						<img
							className='artwork-card-image'
							src={artwork.details.getImageURL()}
							alt={
								artwork.title +
								' by ' +
								artwork.artist.getFullName()
							}
						/>
					</div>
					<div className='artwork-details-text-container'>
						<h2>
							{artwork.title +
								' (' +
								artwork.details.yearCreated +
								')'}
						</h2>
						<>
							<p className='artwork-details-subheading'>Artist</p>
							<p>
								{artwork.artist.getFullName()} &mdash;{' '}
								{artwork.artist.location}
							</p>
						</>
						{artwork.details.description != '' && (
							<>
								<p className='artwork-details-subheading'>
									Description
								</p>
								<p>{artwork.details.description}</p>
							</>
						)}
						<>
							<p className='artwork-details-subheading'>
								{artwork.categories.length === 1
									? 'Category'
									: 'Categories'}
							</p>
							<p>{artwork.getFormattedCategories()}</p>
						</>
						{artwork.details.media != '' && (
							<>
								<p className='artwork-details-subheading'>
									Media
								</p>
								<p>{artwork.details.media}</p>
							</>
						)}
						{artwork.details.getDimensions() != '' && (
							<>
								<p className='artwork-details-subheading'>
									Dimensions
								</p>
								<p>{artwork.details.getDimensions()}</p>
							</>
						)}
					</div>
				</div>
			</Main>
		);
	}
};

export default ArtworkDetailsPage;
