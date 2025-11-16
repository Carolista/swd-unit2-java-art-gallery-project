import { Main } from '@components/layout/exports';
import { Link } from 'react-router';

const AdminHomePage = () => {
	const imageData = {
		src: '/images/gallery-admin.jpeg',
		alt: 'Lower Gallery of Midtown Art Gallery',
	};
	return (
		<Main imageData={imageData}>
			<h1>Admin Portal</h1>
			<p>
				Use this portal to manage records for <Link to='/admin/artists'>artists</Link>, <Link to='/admin/artworks'>artworks</Link>, and <Link to='/admin/categories'>categories</Link>.
			</p>
		</Main>
	);
};

export default AdminHomePage;
