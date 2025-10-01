import { useState } from 'react';
import { InputErrorMessage, TextInput } from '../../common/exports';

const AddCategoryForm = () => {
	const [title, setTitle] = useState('');
	const [hasErrors, setHasErrors] = useState(false);

	// TODO: Access the fetchCategories function from context
	// TODO: Access the useNavigate() hook

    /*
        TODO: 
        Write a function to handle the fetch request for posting a new category
        Handle errors
        After a successful POST, update allCategories in context and navigate back to CategoriesList
    */

	const handleChange = event => {
		setTitle(event.target.value);
	};

	const handleSubmit = event => {
		event.preventDefault();
		/* 
            TODO: 
            Create instance of CategoryDTO using title
            Run isValid() from DTO class to determine if errors should be activated
            If valid, pass CategoryDTO object to the function that makes the POST call
        */
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
