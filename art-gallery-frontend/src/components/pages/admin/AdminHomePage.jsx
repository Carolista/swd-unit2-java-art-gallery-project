import { Main } from '@components/layout/exports';
import { Link } from 'react-router';

const AdminHomePage = () => {
	const imageData = {
		src: '/images/gallery-admin.jpeg',
		alt: 'Lower Gallery of Midtown Art Gallery',
	};
	return (
		<Main imageData={imageData}>
			<h1>Welcome, Admin Users!</h1>
			<p>
				This portal will allow you to help manage our{' '}
				<Link to='/admin/artworks'>collection</Link> of fine art.
			</p>
		</Main>
	);
};

export default AdminHomePage;
