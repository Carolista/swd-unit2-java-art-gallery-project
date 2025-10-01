import { use } from 'react';
import { Link } from 'react-router';
import { DataContext } from '../../../context/DataContext';
import Loading from '../../public/Loading';

const CategoriesList = () => {
	
    // TODO: Get isLoading from DataContext and replace the temporary variable below
	const isLoading = false;

	if (isLoading) {
		return <Loading dataName="categories" />;
	} else {
		
        // TODO: Get allCategories from DataContext and replace the temporary variable below
		const allCategories = [];

		let categoriesJSX = allCategories.map(category => {
			return (
				<tr key={category.id}>
					<td>{category.id}</td>
					<td>{category.title}</td>
				</tr>
			);
		});

		return (
			<main className="main-content">
				<h2>CATEGORIES</h2>
				{allCategories.length ? (
					<>
						<table className="table table-striped">
							<thead>
								<tr>
									<th>ID</th>
									<th>Title</th>
								</tr>
							</thead>
							<tbody>{categoriesJSX}</tbody>
						</table>
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
