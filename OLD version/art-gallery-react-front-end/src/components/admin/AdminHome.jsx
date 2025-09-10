import { Link } from "react-router";

const AdminHome = () => {
	return (
		<>
			<main>
				<h1>Welcome, Admin Users!</h1>
				<p>
					This portal will allow you to help manage our{' '}
					<Link to="/admin/artworks">collection</Link> of fine art.
				</p>
			</main>
			<img src="/gallery-admin.jpeg" width="100%" />
		</>
	);
};

export default AdminHome;
