import { Link } from "react-router";

const CategoriesList = ({ categories }) => {
	let categoriesJSX = categories.map(category => {
		return (
			<tr key={category.id}>
				<td>{category.id}</td>
				<td>{category.title}</td>
			</tr>
		);
	});

	return (
		<main>
			<h2>STYLES</h2>
			{categories.length ? (
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
                    <p>Add a <Link to="/admin/categories/add" >new category</Link>.</p>
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
