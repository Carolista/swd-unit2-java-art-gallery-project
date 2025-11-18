import { use } from 'react';
import { useNavigate } from 'react-router';
import useScreenWidth from '@hooks/useScreenWidth';
import { removeTokenFromStorage } from '@services/storageService';
import { AuthContext } from '@context/AuthContext';
import { DataContext } from '@context/DataContext';
import NavMenu from './NavMenu';

const Header = () => {
	const { auth, setAuth } = use(AuthContext);
	const { allArtworks, setCurrentArtworks } = use(DataContext);

	const screenWidth = useScreenWidth();

	const navigate = useNavigate();

	const handleLogOut = () => {
		setAuth({ token: null, email: null, isAuthenticated: false });
		removeTokenFromStorage();
		navigate('/');
	};

	const adminLinkData = [
		{ id: 'admin', to: '/', label: 'Home', handleClick: null },
		{
			id: 'artists',
			to: '/admin/artists',
			label: 'Artists',
			handleClick: null,
		},
		{
			id: 'artworks',
			to: '/admin/artworks',
			label: 'Artworks',
			handleClick: () => setCurrentArtworks(allArtworks),
		},
		{
			id: 'categories',
			to: '/admin/categories',
			label: 'Categories',
			handleClick: null,
		},
	];

	const adminNonLinkData = [
		{ id: 'logOut', label: 'Log Out', handleClick: handleLogOut },
	];

	const publicLinkData = [
		{ id: 'home', to: '/', label: 'Home', handleClick: null },
		{ id: 'about', to: '/about', label: 'About', handleClick: null },
		{
			id: 'artworks',
			to: '/artworks',
			label: 'Artworks',
			handleClick: null,
		},
		{
			id: 'location',
			to: '/location',
			label: 'Location',
			handleClick: null,
		},
		{ id: 'login', to: '/login', label: 'Log In', handleClick: null },
	];

	return (
		<header>
			<div id='mag'>
				{screenWidth < 480 ? (
					<>
						<strong>M</strong>AG
					</>
				) : (
					<>
						<strong>Midtown</strong> Art Gallery
					</>
				)}
			</div>
			{auth.isAuthenticated ? (
				<NavMenu links={adminLinkData} nonLinks={adminNonLinkData} />
			) : (
				<NavMenu links={publicLinkData} />
			)}
		</header>
	);
};

export default Header;
