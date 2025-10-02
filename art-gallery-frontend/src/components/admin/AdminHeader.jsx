import { use } from 'react';
import { Link, useNavigate } from 'react-router';
import { AuthContext } from '../../context/AuthContext';
import { removeTokenFromStorage } from '../../services/storageService';

const AdminHeader = () => {
	const { setAuth } = use(AuthContext);

	const navigate = useNavigate();

	const handleLogOut = () => {
		setAuth({
			token: null,
			email: null,
			isAuthenticated: false,
		});
		removeTokenFromStorage();
		navigate('/');
	};

	// FUTURE: use Navlinks and active link here with routing
	// FUTURE: Create secondary header with links for add, delete like old Java app

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
