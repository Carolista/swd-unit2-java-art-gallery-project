import { Link } from "react-router";

const PublicHome = () => {
	return (
        <main>
            <div className="main-content">
                <h1>Welcome!</h1>
                <p>
                    View our <Link to="/artworks">collection</Link> of fine art by celebrated local artists.
                </p>
            </div>
            <img className="big-image" src="/gallery-public.jpeg" width="100%" />
        </main>
	);
};

export default PublicHome;
