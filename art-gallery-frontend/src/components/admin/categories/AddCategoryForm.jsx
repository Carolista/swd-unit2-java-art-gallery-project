import { use, useState } from 'react';
import { useNavigate } from 'react-router';
import { InputErrorMessage, TextInput } from '../../common/exports';
import { DataContext } from '../../../context/DataContext';
import { CategoryDTO } from '../../../classes/exports.js';

const AddCategoryForm = () => {
	const [title, setTitle] = useState('');
	const [hasErrors, setHasErrors] = useState(false);

	const navigate = useNavigate();
	const { fetchCategories } = use(DataContext);

	const saveNewCategory = async newCategoryDTO => {
		try {
			const response = await fetch('http://localhost:8080/api/categories/add', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(newCategoryDTO),
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
			// Use toast or banner to notify user of success or failure
		}
	};

	const handleChange = event => {
		setTitle(event.target.value);
	};

	const handleSubmit = event => {
		event.preventDefault();
		const categoryDTO = new CategoryDTO(title);
		if (!categoryDTO.isValid()) {
			setHasErrors(true);
		} else {
			saveNewCategory(categoryDTO);
		}
	};

	return (
		<main className="main-content">
			<h3>Add Category</h3>
			<form>
				<div className="form-item">
					<TextInput
						id="title"
						label="Title"
						value={title}
						handleChange={handleChange}
					/>
					<InputErrorMessage
						hasError={hasErrors && title === ''}
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
