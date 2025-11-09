import { use } from 'react';
import { Link, useNavigate } from 'react-router';
import { AuthContext } from '../../context/AuthContext';
import { removeTokenFromStorage } from '../../services/storageService';
import { DataContext } from '../../context/DataContext';

const AdminHeader = () => {
	const { setAuth } = use(AuthContext);
	const { allArtworks, setCurrentArtworks } = use(DataContext);

	const navigate = useNavigate();

	const handleLogOut = () => {
		setAuth({ token: null, email: null, isAuthenticated: false });
		removeTokenFromStorage();
		navigate('/');
	};

	return (
		<>
			<header>
				<div id='mag'>
					<Link className='white-link' to='/'>
						<b>Midtown</b> Art Gallery
					</Link>
				</div>
				<div className='nav'>
					<Link className='navlink' to='/admin/artists'>
						Artists
					</Link>
					<Link
						className='navlink'
						to='/admin/artworks'
						onClick={() => setCurrentArtworks(allArtworks)}>
						Artworks
					</Link>
					<Link className='navlink' to='/admin/categories'>
						Categories
					</Link>
					|
					<span className='navlink' onClick={handleLogOut}>
						Log Out
					</span>
				</div>
			</header>
		</>
	);
};

export default AdminHeader;
