import { useState } from 'react';
import { TextInput, InputErrorMessage } from '../../common/exports';

// TODO: Pass in function to re-fetch data after POST
const AddCategoryForm = () => {
	const [category, setCategory] = useState('');
	const [hasErrors, setHasErrors] = useState(false);

    // TODO: Create reference to useNavigate() from react-router

	const handleChange = event => {
		setCategory(event.target.value);
	};

    // TODO: Create new async function to make POST to backend with new category data, re-fetch data, then navigate to list

	const handleSubmit = event => {
        event.preventDefault();
		if (category === '') {
			setHasErrors(true);
		} else {
			// TODO: Create new category data and call new save function
		}
	};

	return (
		<main>
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
