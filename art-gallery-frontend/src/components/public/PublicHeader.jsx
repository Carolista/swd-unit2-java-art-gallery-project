import { Link } from 'react-router';

const PublicHeader = ({ setLoggedIn }) => {
    // TODO #9 - Remove prop and handleLogin()
    const handleLogIn = () => {
		setLoggedIn(true);
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
					<span className="non-link">About</span>
					<Link className="navlink" to="/artworks">
						Artworks
					</Link>
					<span className="non-link">Exhibitions</span>
					<span className="non-link">Contact Us</span>|
                    {/* TODO #9 - Replace fake Log In link with links to register and login components */}
					<span className="navlink" onClick={handleLogIn}>
						Log In
					</span>
				</div>
			</header>
		</>
	);
};

export default PublicHeader;
