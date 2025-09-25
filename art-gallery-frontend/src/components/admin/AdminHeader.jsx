import { Link } from 'react-router';

const AdminHeader = ({ setLoggedIn }) => {
	const handleLogOut = () => {
		setLoggedIn(false);
	};

	// FUTURE: use Navlinks and active link here with routing
	// FUTURE: Create secondary header with links for add, delete like old Java app
	// TODO: Improve responsive styling

	return (
		<>
			<header>
				<div id="mag">
					<Link className="white-link" to="/">
						<b>Midtown</b> Art Gallery
					</Link>
				</div>
				<div className="nav">
					<Link className="navlink" to="/admin/artists">
						Artists
					</Link>
					<Link className="navlink" to="/admin/artworks">
						Artworks
					</Link>
					<Link className="navlink" to="/admin/categories">
						Categories
					</Link>
                    |
					<span className="navlink" onClick={handleLogOut}>
						Log Out
					</span>
				</div>
			</header>
		</>
	);
};

export default AdminHeader;
