import { use } from 'react';
import { Link } from 'react-router';
import { DataContext } from '../../../context/DataContext';
import { Loading } from '../../public/exports.js';

const CategoriesList = () => {
	const { isLoading } = use(DataContext);

	if (isLoading) {
		return <Loading dataName="categories" />;
	} else {
        
		// TODO: Access fetchCategories function from context
		const { allCategories } = use(DataContext);

		/*
            TODO: Write a function to handle the fetch request for deleting a category
            Handle errors
            After a successful DELETE, update allCategories in context
        */

		const handleDelete = id => {
			/*
                TODO: Use browser's confirm popup to ask if user is sure they want to delete
                // Include category title in message
                // If confirmed, call function to delete category and pass the id
            */
		};

		let categoriesJSX = allCategories.map(category => {
			return (
				<tr key={category.id}>
					<td>{category.id}</td>
					<td>{category.title}</td>
					<td className="delete-icon">
						{/* Add anonymous function that will call click handler and pass in id */}
						<span>
							<i
								className="fa-solid fa-trash-can"
								title={`Delete ${category.title}`}></i>
						</span>
					</td>
				</tr>
			);
		});

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
