import { use } from 'react';
import { useNavigate } from 'react-router';
import { AuthContext } from '@context/AuthContext';
import { DataContext } from '@context/DataContext';
import { removeTokenFromStorage } from '@services/storageService';
import NavMenu from './NavMenu';

const Header = () => {
	const { auth, setAuth } = use(AuthContext);
	const { allArtworks, setCurrentArtworks } = use(DataContext);

	const navigate = useNavigate();

	const handleGoToLogIn = () => {
		navigate('/login');
	};

	const handleLogOut = () => {
		setAuth({ token: null, email: null, isAuthenticated: false });
		removeTokenFromStorage();
		navigate('/');
	};

	const commonLinkData = [
		{ id: 'home', label: 'Home', to: '/home', handleClick: null },
	];

	const adminLinkData = [
		{
			id: 'artists',
			label: 'Artists',
			to: '/admin/artists',
			handleClick: null,
		},
		{
			id: 'artworks',
			label: 'Artworks',
			to: '/admin/artworks',
			handleClick: () => setCurrentArtworks(allArtworks),
		},
		{
			id: 'categories',
			label: 'Categories',
			to: '/admin/categories',
			handleClick: null,
		},
	];

	const adminNonLinkData = [
		{ id: 'logOut', label: 'Log Out', handleClick: handleLogOut },
	];

	const publicLinkData = [
		{ id: 'about', label: 'About', to: '/about', handleClick: null },
		{
			id: 'artworks',
			label: 'Artworks',
			to: '/artworks',
			handleClick: null,
		},
		{
			id: 'location',
			label: 'Location',
			to: '/location',
			handleClick: null,
		},
	];

	const publicNonLinkData = [
		{ id: 'logIn', label: 'Log In', handleClick: handleGoToLogIn },
	];

	return (
		<header>
			<div id='mag'>
				<strong>Midtown</strong> Art Gallery
			</div>
			{auth.isAuthenticated ? (
				<NavMenu
					links={[...commonLinkData, ...adminLinkData]}
					nonLinks={adminNonLinkData}
				/>
			) : (
				<NavMenu
					links={[...commonLinkData, ...publicLinkData]}
					nonLinks={publicNonLinkData}
				/>
			)}
		</header>
	);
};

export default Header;
