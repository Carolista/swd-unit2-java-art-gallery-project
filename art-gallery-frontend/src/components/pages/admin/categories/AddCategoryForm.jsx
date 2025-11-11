import { use, useState } from 'react';
import { Form, useNavigate } from 'react-router';
import { CategoryDTO } from '@classes/exports.js';
import { AuthContext } from '@context/AuthContext';
import { DataContext } from '@context/DataContext';
import {
	FormItem,
	Input,
	InputErrorMessage,
} from '@components/form-input/exports';
import { Main } from '@components/layout/exports';

const AddCategoryForm = () => {
	const [title, setTitle] = useState('');
	const [hasErrors, setHasErrors] = useState(false);

	const navigate = useNavigate();

	const { auth } = use(AuthContext);
	const { fetchCategories } = use(DataContext);

	const saveNewCategory = async newCategoryDTO => {
		try {
			const response = await fetch(
				'http://localhost:8080/api/categories/add',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Authorization: 'Bearer ' + auth.token,
					},
					body: JSON.stringify(newCategoryDTO),
				},
			);

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(
					errorData.message || `ERROR - Status ${response.status}`,
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

	const buttonData = [
		{
			id: 'add-category',
			type: 'submit',
			label: 'Add Category',
			handleClick: handleSubmit,
		},
	];

	return (
		<Main>
			<h3>Add Category</h3>
			<Form buttonData={buttonData}>
				<FormItem>
					<Input
						id='title'
						label='Title'
						value={title}
						handleChange={handleChange}
					/>
					<InputErrorMessage
						hasError={hasErrors && title === ''}
						msg='Category name is required.'
					/>
				</FormItem>
			</Form>
		</Main>
	);
};

export default AddCategoryForm;
