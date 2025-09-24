import { useState } from 'react';
import { TextInput, InputErrorMessage } from '../../common/_exports';
import { useNavigate } from 'react-router';

const AddCategoryForm = ({ refetch }) => {
	const [category, setCategory] = useState('');
	const [hasErrors, setHasErrors] = useState(false);

	const navigate = useNavigate();

	const handleChange = event => {
		setCategory(event.target.value);
	};

	const saveNewCategory = async category => {
		try {
			await fetch('http://localhost:8080/api/categories/add', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Access-Control-Allow-Origin': '*',
				},
				body: JSON.stringify(category),
			});
			// TODO: Capture response and improve error handling
		} catch (error) {
			console.error(error.message);
		}
		refetch();
		navigate('/admin/categories');
	};

	const handleSubmit = event => {
        event.preventDefault();
		if (category === '') {
			setHasErrors(true);
		} else {
			let newCategory = { title: category };
			saveNewCategory(newCategory);
		}
	};

    // TODO: Alter width of field at full page size

	return (
		<main className="main-content">
			<h3>Add Category</h3>
			<form>
				<div className="form-item">
					<label htmlFor="name">Name of Category</label>
					<TextInput
						id="title"
						label="Title"
						value={category}
						handleChange={handleChange}
					/>
					<InputErrorMessage
						hasError={hasErrors && category === ''}
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
