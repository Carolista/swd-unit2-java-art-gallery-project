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

        const handleDelete = id => {
            // TODO: Use alert (or modal) to confirm deletion before allowing fetch request
            // TODO: Make DELETE call
            // TODO: Notify with toast or banner if unsuccessful
            // TODO: Confirm with toast or banner after successful delete 
            console.log("This will eventually delete the category with id " + id)
        }

		let categoriesJSX = allCategories.map(category => {
			return (
				<tr key={category.id}>
					<td>{category.id}</td>
					<td>{category.title}</td>
					<td className="delete-icon"><span onClick={() => handleDelete(category.id)}><i className="fa-solid fa-trash-can" title={`Delete ${category.title}`}></i></span></td>
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
									<th></th>
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
