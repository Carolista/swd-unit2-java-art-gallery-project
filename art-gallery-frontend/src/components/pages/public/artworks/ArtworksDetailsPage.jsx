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
				<p>Sorry, that artwork does not exist!</p>
				<Spacer marginY="20px" />
                <GoBack text={'View All Artworks'} handleClick={handleGoToArtworksPage} />
			</ErrorPage>
		);
	} else {

		return (
			<Main>
				<GoBack text={'View All Artworks'} handleClick={handleGoToArtworksPage} />
				<h2>ARTWORK DETAILS</h2>
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
                        <h4 className='mb-4 mt-2 font-bold'>
                            {artwork.title +
                                ' (' +
                                artwork.details.yearCreated +
                                ')'}
                        </h4>
                        <>
                            <h5>Artist</h5>
                            <p>
                                {artwork.artist.getFullName()} &mdash;{' '}
                                {artwork.artist.location}
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
                                {artwork.categories.length === 1
                                    ? 'Category'
                                    : 'Categories'}
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
			</Main>
		);
	}
};

export default ArtworkDetailsPage;
