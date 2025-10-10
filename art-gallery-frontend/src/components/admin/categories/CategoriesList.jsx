import { use } from 'react';
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
