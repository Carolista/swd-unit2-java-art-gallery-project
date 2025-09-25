import { use } from 'react';
import { Link } from 'react-router';
import { DataContext } from '../../../context/DataContext';
import Loading from '../../public/Loading';

const CategoriesList = () => {
	const { isLoading } = use(DataContext);

	if (isLoading) {
		return <Loading dataName="categories" />;
	} else {
		const { allCategories, fetchCategories } = use(DataContext);

        const deleteCategory = async id => {
			try {
				const response = await fetch(
					`http://localhost:8080/api/categories/delete/${id}`,
					{
						method: 'DELETE',
						headers: {
							'Access-Control-Allow-Origin': '*',
						},
					}
				);
				if (!response.ok) {
					const errorData = await response.json();
					throw new Error(
						errorData.message || `ERROR - Status ${response.status}`
					);
				} else {
					fetchCategories(); // update state so list will update
					// FUTURE: Confirm with toast or banner after successful delete
				}
			} catch (error) {
				console.error(error.message);

				// FUTURE: Use toast or banner to notify user that deletion was unsuccessful
			}
		};

        const handleDelete = id => {
            // FUTURE: Use modal instead of alert
			let confirmed = confirm(`
                Are you sure you want to delete this record?
                
                Category: ${allCategories
									.find(category => category.id == id)
									.title}
                `);
			if (confirmed) {
				deleteCategory(id);
			}
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
				<h2>CATEGORIES</h2>
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
