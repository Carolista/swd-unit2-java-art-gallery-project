import { Link } from 'react-router';

const AdminHeader = ({ setLoggedIn }) => {

    // TODO #8 - Remove prop, access setAuth from context and add useNavigate()

	const handleLogOut = () => {
        // TODO #8 - use setAuth to reset auth to null/null/false instead of setting loggedIn
        // Remove token from storage
        // Navigate to home
		setLoggedIn(false);
	};

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
