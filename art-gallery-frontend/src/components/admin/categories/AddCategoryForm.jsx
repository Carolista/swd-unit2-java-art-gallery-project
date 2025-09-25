import { useState, use } from 'react';
import { useNavigate } from 'react-router';
import { DataContext } from '../../../context/DataContext';
import { TextInput, InputErrorMessage } from '../../common/_exports';

const AddCategoryForm = () => {
	const [category, setCategory] = useState('');
	const [hasErrors, setHasErrors] = useState(false);

	const navigate = useNavigate();
	const { fetchArtists } = use(DataContext);

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
		fetchArtists(); // update state before returning to list
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

	// FUTURE: Alter width of fields at full page size and check responsive behavior

	return (
		<main className="main-content">
			<h3>Add Category</h3>
			<form>
				<div className="form-item">
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
