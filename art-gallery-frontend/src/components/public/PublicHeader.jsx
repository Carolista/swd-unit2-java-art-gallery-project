import { Link } from 'react-router';

const PublicHeader = ({ setLoggedIn }) => {
	const handleLogIn = () => {
		setLoggedIn(true);
	};

	// FUTURE: use Navlinks and active link here with routing
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
					<Link className="navlink" to="/artworks">
						Artworks
					</Link>
					<span className="non-link">Exhibitions</span>
					<span className="non-link">Contact Us</span>
					<span className="navlink" onClick={handleLogIn}>
						Admin Login
					</span>
				</div>
			</header>
		</>
	);
};

export default PublicHeader;
