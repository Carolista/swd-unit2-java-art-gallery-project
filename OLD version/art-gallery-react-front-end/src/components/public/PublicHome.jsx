import { Link } from "react-router";

const PublicHome = () => {
	return (
		<>
			<main>
				<h1>Welcome!</h1>
				<p>
					View our <Link to="/artworks">collection</Link> of fine art by celebrated local artists.
				</p>
			</main>
			<img src="/gallery-public.jpeg" width="100%" />
		</>
	);
};

export default PublicHome;
