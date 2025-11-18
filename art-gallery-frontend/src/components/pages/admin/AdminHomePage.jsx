import { Link } from 'react-router';
import { Main } from '@components/layout/exports';

const AdminHomePage = () => {
	return (
		<Main imageId='admin-home-image'>
			<h1>Admin Portal</h1>
			<p>
				Use this portal to manage records for{' '}
				<Link to='/admin/artists'>artists</Link>,{' '}
				<Link to='/admin/artworks'>artworks</Link>, and{' '}
				<Link to='/admin/categories'>categories</Link>.
			</p>
		</Main>
	);
};

export default AdminHomePage;
