import { Link } from 'react-router';

const PublicHeader = () => {
	return (
		<>
			<header>
				<div id="mag">
					<b>Midtown</b> Art Gallery
				</div>
				<div className="nav">
					<Link className="navlink" to="/artworks">
						Artworks
					</Link>
					<span className="faux-link">Exhibitions</span>
					<span className="faux-link">Contact Us</span>
					<Link className="navlink" to="/login">
						Log In
					</Link>
				</div>
			</header>
		</>
	);
};

export default PublicHeader;
