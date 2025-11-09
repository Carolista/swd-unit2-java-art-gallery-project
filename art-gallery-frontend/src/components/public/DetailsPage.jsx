import { use } from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import { DataContext } from '../../context/DataContext';
import ErrorPage from './ErrorPage';
import Loading from './Loading';

const DetailsPage = () => {
	const { id } = useParams();

	const { isLoading } = use(DataContext);

	if (isLoading) {
		return <Loading dataName="artwork" />;
	} else {
		const { allArtworks } = use(DataContext);

		const artwork = allArtworks.find(artwork => String(artwork.id) === id);

		if (!artwork) {
			const navigate = useNavigate();
			const handleGoBack = () => {
				navigate(-1);
			};

			return (
				<ErrorPage>
					<p>Sorry, that artwork does not exist!</p>
					<span onClick={handleGoBack}>
						<i className="fa-solid fa-circle-arrow-left"></i> Go Back
					</span>
				</ErrorPage>
			);
		} else {
			return (
				<main className="main-content">
					<p>
						<Link to="/artworks">
							<i className="fa-solid fa-circle-arrow-left"></i>
						</Link>
						&nbsp; Back to <Link to="/artworks">Artworks Gallery View</Link>
					</p>
					<h2>ARTWORK DETAILS</h2>
					<div className="container">
						<div className="row">
							<div className="col-6">
								<img
									className="card-image"
									src={artwork.details.getImageURL()}
                                    alt={artwork.title + " by " + artwork.artist.getFullName()}
								/>
							</div>
							<div className="col-6">
								<h4 className="mb-4 mt-2 font-bold">
									{artwork.title + ' (' + artwork.details.yearCreated + ')'}
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
					</div>
				</main>
			);
		}
	}
};

export default DetailsPage;
