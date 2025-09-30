import { useState } from 'react';
import { TextInput, InputErrorMessage } from '../../common/exports';

const AddCategoryForm = () => {
	const [category, setCategory] = useState('');
	const [hasErrors, setHasErrors] = useState(false);

	const handleChange = event => {
		setCategory(event.target.value);
	};

	const handleSubmit = event => {
		event.preventDefault();
		if (category === '') {
			setHasErrors(true);
		} else {
			// TODO: Save artist and use CategoryDTO to form object for transfer
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
