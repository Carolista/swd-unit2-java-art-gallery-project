import { Link } from 'react-router';

const PublicHeader = () => {
	return (
		<>
			<header>
				<div id="mag">
					<Link to="/"><b>Midtown</b> Art Gallery</Link>
				</div>
				<div className="nav">
					<Link className="navlink" to="/artworks">
						Artworks
					</Link>
					<span className="faux-link">Exhibitions</span>
					<span className="faux-link">Contact Us</span>
					<Link className="navlink" to="/register">
						Register
					</Link>
					<Link className="navlink" to="/login">
						Log In
					</Link>
				</div>
			</header>
		</>
	);
};

export default PublicHeader;
