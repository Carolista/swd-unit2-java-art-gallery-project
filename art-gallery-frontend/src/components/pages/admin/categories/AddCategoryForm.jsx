import { use, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { CategoryDTO } from '@classes/exports.js';
import { AuthContext } from '@context/AuthContext';
import { DataContext } from '@context/DataContext';
import {
	FormItem,
	Input,
	InputErrorMessage,
} from '@components/form-input/exports';
import { Main, FormWithButtons } from '@components/layout/exports';

const AddCategoryForm = () => {
	const [title, setTitle] = useState('');
	const [hasErrors, setHasErrors] = useState(false);
	const [submitting, setSubmitting] = useState(false);

	const navigate = useNavigate();

	const { auth } = use(AuthContext);
	const { fetchCategories } = use(DataContext);

	const inputRef = useRef(null);

	useEffect(() => {
		inputRef.current.focus();
	}, []);

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
			// TODO: Use toast or banner to notify user of success or failure
		}
	};

	const handleChange = event => {
		setTitle(event.target.value);
	};

	const handleSubmit = event => {
		event.preventDefault();
		const categoryDTO = new CategoryDTO(title);
		if (!categoryDTO.isValid()) {
			setSubmitting(false);
			setHasErrors(true);
		} else {
			setSubmitting(true);
			saveNewCategory(categoryDTO);
		}
	};

	const buttonData = [
		{
			id: 'add-category',
			type: 'submit',
			label: 'Add Category',
			handleClick: handleSubmit,
			shouldDisable: submitting,
		},
	];

	return (
		<Main>
			<h1>Add Category</h1>
			<FormWithButtons id="add-category" buttonData={buttonData}>
				<FormItem>
					<Input
						id='title'
						label='Title'
						type='text'
						value={title}
						ref={inputRef}
						required={true}
						handleChange={handleChange}
					/>
					<InputErrorMessage
						hasError={hasErrors && title === ''}
						msg='Category name is required.'
					/>
				</FormItem>
			</FormWithButtons>
		</Main>
	);
};

export default AddCategoryForm;
