import { Link } from 'react-router';

const CategoriesList = ({ categories }) => {
	let categoriesJSX = categories.map(category => {
		return (
			<tr key={category.id}>
				<td>{category.id}</td>
				<td>{category.title}</td>
			</tr>
		);
	});
    
    // TODO: Add sort by column
    // TODO: Add links to view artworks by category
    
	return (
		<main className="main-content">
			<h2>STYLES</h2>
			{categories.length ? (
				<>
					{categories.length > 10 && (
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
};

export default CategoriesList;
