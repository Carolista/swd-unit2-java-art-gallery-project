import Main from '@components/layout/Main';
import { Link } from 'react-router';

const PublicHomePage = () => {
	return (
		<Main imageId='public-home-image'>
			<h1>Welcome!</h1>
			<p>
				View our <Link to='/artworks'>collection</Link> of fine art by
				celebrated local artists.
			</p>
		</Main>
	);
};

export default PublicHomePage;
