import { use } from 'react';
import { Link } from 'react-router';
import { DataContext } from '../../../context/DataContext';
import Loading from '../../public/Loading';

const ArtworksList = () => {

    const { isLoading } = use(DataContext);

    if (isLoading) {
		return <Loading dataName="artworks" />;
	} else {

        const { allArtworks } = use(DataContext);

        // Subcomponent for local use
        const ArtworkRow = ({ artwork }) => {

            // FIXME: Details component is rerouting to home

            return (
                <tr>
                    <td>{artwork.id}</td>
                    <td>{artwork.title}</td>
                    <td>{artwork.artist.getFullName()}</td>
                    <td>{artwork.details.yearCreated}</td>
                    <td>
                        <img src={artwork.details.getImageURL()} width="50px" />
                    </td>
                </tr>
            );
        };
    
        let artworksJSX = allArtworks.map(artwork => {
            return <ArtworkRow key={artwork.id} artwork={artwork} />;
        });
    
        // FUTURE: Add sort by column
        // FUTURE: Add filter by artist and filter by category
    
        return (
            <main className="main-content">
                <h2>ARTWORKS</h2>
                {allArtworks.length ? (
                    <>
                        {allArtworks.length > 10 && (
                            <p>
                                Add a <Link to="/admin/artworks/add">new artwork</Link>.
                            </p>
                        )}
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Title</th>
                                    <th>Artist</th>
                                    <th>Year Created</th>
                                    <th>Image</th>
                                </tr>
                            </thead>
                            <tbody>{artworksJSX}</tbody>
                        </table>
                        <p>
                            Add a <Link to="/admin/artworks/add">new artwork</Link>.
                        </p>
                    </>
                ) : (
                    <p>
                        <em>No artworks to display.</em>
                    </p>
                )}
            </main>
        );
    }
};

export default ArtworksList;
