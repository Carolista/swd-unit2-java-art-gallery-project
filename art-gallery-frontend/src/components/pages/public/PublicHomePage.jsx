import Main from '@components/layout/Main';
import { Link } from 'react-router';

const PublicHomePage = () => {
	const imageData = {
		src: '/images/gallery-public.jpeg',
		alt: 'Main Entry of Midtown Art Gallery',
	};

	return (
		<Main imageData={imageData}>
			<h1>Welcome!</h1>
			<p>
				View our <Link to='/artworks'>collection</Link> of fine art by
				celebrated local artists.
			</p>
		</Main>
	);
};

export default PublicHomePage;
