import { Link } from 'react-router';

const AdminHome = () => {
	return (
		<main>
			<div className="main-content">
				<h1>Welcome, Admin Users!</h1>
				<p>
					This portal will allow you to help manage our{' '}
					<Link to="/admin/artworks">collection</Link> of fine art.
				</p>
			</div>
			<img src="/images/gallery-admin.jpeg" width="100%" alt="Image of gallery room with misc artworks on display" />
		</main>
	);
};

export default AdminHome;
