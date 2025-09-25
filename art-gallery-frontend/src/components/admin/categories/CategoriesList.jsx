import { use } from 'react';
import { Link } from 'react-router';
import { DataContext } from '../../../context/DataContext';
import Loading from '../../public/Loading';

const CategoriesList = () => {

    const { isLoading } = use(DataContext);

    if (isLoading) {
		return <Loading dataName="categories" />;
	} else {

        const { allCategories } = use(DataContext);

        let categoriesJSX = allCategories.map(category => {
            return (
                <tr key={category.id}>
                    <td>{category.id}</td>
                    <td>{category.title}</td>
                </tr>
            );
        });
        
        // FUTURE: Add sort by column
        // FUTURE: Add links to view artworks by category
        
        return (
            <main className="main-content">
                <h2>STYLES</h2>
                {allCategories.length ? (
                    <>
                        {allCategories.length > 10 && (
                            <p>
                                Add a <Link to="/admin/categories/add">new category</Link>.
                            </p>
                        )}
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Title</th>
                                </tr>
                            </thead>
                            <tbody>{categoriesJSX}</tbody>
                        </table>
                        <p>
                            Add a <Link to="/admin/categories/add">new category</Link>.
                        </p>
                    </>
                ) : (
                    <p>
                        <em>No categories to display.</em>
                    </p>
                )}
            </main>
        );
    }

};

export default CategoriesList;
