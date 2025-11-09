import { Link } from 'react-router';

const PublicHeader = () => {
	return (
		<>
			<header>
				<div id='mag'>
					<Link className='white-link' to='/'>
						<b>Midtown</b> Art Gallery
					</Link>
				</div>
				<div className='nav'>
					<span className='non-link'>About</span>
					<Link className='navlink' to='/artworks'>
						Artworks
					</Link>
					<span className='non-link'>Exhibitions</span>
					<span className='non-link'>Contact Us</span>|
					<Link className='navlink' to='/register'>
						Register
					</Link>
					<Link className='navlink' to='/login'>
						Log In
					</Link>
				</div>
			</header>
		</>
	);
};

export default PublicHeader;
