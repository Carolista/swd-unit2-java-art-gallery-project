import { use, useEffect, useState } from 'react';
import { Link } from 'react-router';
import { AuthContext } from '@context/AuthContext.jsx';
import { DataContext } from '@context/DataContext';
import useScreenWidth from '@hooks/useScreenWidth';
import { sortObjById, sortObjByString } from '@shared/utils.js';
import {
	ColumnHeading,
	SortableColumnHeading,
} from '@components/common/exports.js';
import { Main } from '@components/layout/exports';

const CategoriesList = () => {
	const { auth } = use(AuthContext);
	const { allArtworks, allCategories, fetchCategories } = use(DataContext);

	const screenWidth = useScreenWidth();

	const [currentCategories, setCurrentCategories] = useState([
		...allCategories,
	]);
	const [currentSortColumn, setCurrentSortColumn] = useState('id');

	const getNumberOfArtworksByCategory = categoryId => {
		return [...allArtworks].filter(artwork => {
			return artwork.categories
				.map(category => category.id)
				.includes(categoryId);
		}).length;
	};

	useEffect(() => {
		let sortFunction =
			currentSortColumn === 'id' ? sortObjById : sortObjByString;
		let updatedCategories = sortFunction(
			[...allCategories],
			currentSortColumn,
		);
		setCurrentCategories(updatedCategories);
	}, [currentSortColumn, allCategories]);

	useEffect(() => {
		setCurrentCategories([...allCategories]);
	}, [allCategories]);

	const deleteCategory = async id => {
		try {
			const response = await fetch(
				`http://localhost:8080/api/categories/delete/${id}`,
				{
					method: 'DELETE',
					headers: { Authorization: 'Bearer ' + auth.token },
				},
			);
			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(
					errorData.message || `ERROR - Status ${response.status}`,
				);
			} else {
				fetchCategories();
			}
		} catch (error) {
			console.error(error.message);
		} finally {
			// TODO: Use toast or banner to notify user of success or failure
		}
	};

	const handleDelete = id => {
		let confirmed = confirm(`
                Are you sure you want to delete this record?
                
                Category: ${
					currentCategories.find(category => category.id == id).title
				}
                `);
		if (confirmed) {
			deleteCategory(id);
		}
	};
	let categoriesJSX = currentCategories.map(category => {
		let numArtworks = getNumberOfArtworksByCategory(category.id);
		const getViewArtworksJSX = () => {
			return numArtworks ? (
				<Link
					to='/admin/artworks'
					state={{ currentCategory: category }}>
					View {numArtworks} artworks
				</Link>
			) : (
				''
			);
		};
		return (
			<tr key={category.id}>
				<td className='align-right'>{category.id}</td>
				<td>{category.title}</td>
				<td>{getViewArtworksJSX()}</td>
				<td className='delete-icon'>
					<span onClick={() => handleDelete(category.id)}>
						<i
							className='fa-solid fa-trash-can'
							title={`Delete ${category.title}`}></i>
					</span>
				</td>
			</tr>
		);
	});

	return (
		<Main>
			<h1>Categories</h1>
			{/* TODO: Add subnav for CRUD links */}
			<p className='above-table'>
				Add a <Link to='/admin/categories/add'>new category</Link>.
			</p>
			{screenWidth < 768 ? (
				<p>Please increase screen width to view the table.</p>
			) : currentCategories.length ? (
				<>
					<table className='table table-striped'>
						<thead>
							<tr>
								<SortableColumnHeading
									id='id'
									classes='align-right'
									property='id'
									current={currentSortColumn}
									setCurrent={setCurrentSortColumn}>
									ID
								</SortableColumnHeading>
								<SortableColumnHeading
									id='title'
									property='title'
									current={currentSortColumn}
									setCurrent={setCurrentSortColumn}>
									Title
								</SortableColumnHeading>
								<ColumnHeading id='artworks'>
									Artworks
								</ColumnHeading>
								<ColumnHeading id='delete'>
									<i
										className='fa-solid fa-trash-can'
										title='Delete'></i>
								</ColumnHeading>
							</tr>
						</thead>
						<tbody>{categoriesJSX}</tbody>
					</table>
					{currentCategories.length > 10 && (
						<p>
							Add a{' '}
							<Link to='/admin/categories/add'>new category</Link>
							.
						</p>
					)}
				</>
			) : (
				<p>
					<em>No categories to display.</em>
				</p>
			)}
		</Main>
	);
};

export default CategoriesList;
