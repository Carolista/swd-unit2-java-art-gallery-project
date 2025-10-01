import { use } from 'react';
import { Link } from 'react-router';
import { DataContext } from '../../../context/DataContext';
import { Loading } from '../../public/exports.js';

const CategoriesList = () => {
	const { isLoading } = use(DataContext);

	if (isLoading) {
		return <Loading dataName="categories" />;
	} else {
		const { allArtworks, allCategories, fetchCategories } = use(DataContext);

		const getNumberOfArtworksByCategory = categoryId => {
			return [...allArtworks].filter(artwork => {
				return artwork.categories
					.map(category => category.id)
					.includes(categoryId);
			}).length;
		};

		const deleteCategory = async id => {
			try {
				const response = await fetch(
					`http://localhost:8080/api/categories/delete/${id}`,
					{
						method: 'DELETE',
					}
				);
				if (!response.ok) {
					const errorData = await response.json();
					throw new Error(
						errorData.message || `ERROR - Status ${response.status}`
					);
				} else {
					fetchCategories(); // update state so list will update
				}
			} catch (error) {
				console.error(error.message);
			} finally {
				// FUTURE: Use toast or banner to notify user of success or failure
				// Could have various specific outcomes depending on type of error
			}
		};

		const handleDelete = id => {
			// FUTURE: Use modal instead of alert
			let confirmed = confirm(`
                Are you sure you want to delete this record?
                
                Category: ${
									allCategories.find(category => category.id == id).title
								}
                `);
			if (confirmed) {
				deleteCategory(id);
			}
		};
		let categoriesJSX = allCategories.map(category => {
			let numArtworks = getNumberOfArtworksByCategory(category.id);
			const getViewArtworksJSX = () => {
				return numArtworks ? (
					<Link to="/admin/artworks" state={{ currentCategory: category }}>
						View {numArtworks} artworks
					</Link>
				) : (
					''
				);
			};
			return (
				<tr key={category.id}>
					<td>{category.id}</td>
					<td>{category.title}</td>
					<td>{getViewArtworksJSX()}</td>
					<td className="delete-icon">
						<span onClick={() => handleDelete(category.id)}>
							<i
								className="fa-solid fa-trash-can"
								title={`Delete ${category.title}`}></i>
						</span>
					</td>
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
									<th>Artworks</th>
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
