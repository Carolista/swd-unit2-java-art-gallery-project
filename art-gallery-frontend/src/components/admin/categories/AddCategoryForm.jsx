import { use, useState } from 'react';
import { useNavigate } from 'react-router';
import { InputErrorMessage, TextInput } from '../../common/exports';
import { DataContext } from '../../../context/DataContext';

const AddCategoryForm = () => {
	const [categoryData, setCategoryData] = useState('');
	const [hasErrors, setHasErrors] = useState(false);

	const navigate = useNavigate();
	const { fetchCategories } = use(DataContext);

	const handleChange = event => {
		setCategoryData(event.target.value);
	};

	const saveNewCategory = async category => {
		try {
			const response = await fetch('http://localhost:8080/api/categories/add', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(category),
			});

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(
					errorData.message || `ERROR - Status ${response.status}`
				);
			} else {
				fetchCategories();
				navigate('/admin/categories');
			}
		} catch (error) {
			console.error(error.message);
		} finally {
			// FUTURE: Use toast or banner to notify user of success or failure
		}
	};

	const handleSubmit = event => {
		event.preventDefault();
		if (categoryData === '') {
			setHasErrors(true);
		} else {
			let newCategory = { title: categoryData };
			saveNewCategory(newCategory);
		}
	};

	// FUTURE: Alter width of fields at full page size and check responsive behavior

	return (
		<main className="main-content">
			<h3>Add Category</h3>
			<form>
				<div className="form-item">
					<TextInput
						id="title"
						label="Title"
						value={categoryData}
						handleChange={handleChange}
					/>
					<InputErrorMessage
						hasError={hasErrors && categoryData === ''}
						msg="Category name is required."
					/>
				</div>
				<button type="submit" onClick={handleSubmit}>
					Add Category
				</button>
			</form>
		</main>
	);
};

export default AddCategoryForm;
