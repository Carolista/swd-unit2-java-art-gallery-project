import { useContext } from 'react';
import { Link, useNavigate } from 'react-router';
import { AuthContext } from '../../context/AuthContext';
import { removeTokenFromStorage } from '../../services/storage-service';

const AdminHeader = () => {
	const { setAuth } = useContext(AuthContext);

	const navigate = useNavigate();

	const handleLogout = () => {
		setAuth({
			token: null,
			email: null,
			isAuthenticated: false,
		});
		removeTokenFromStorage();
		navigate('/');
	};

	return (
		<>
			<header>
				<div id="mag">
					<b>Midtown</b> Art Gallery
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
					<span className="navlink" onClick={handleLogout}>
						Log Out
					</span>
				</div>
			</header>
		</>
	);
};

export default AdminHeader;
