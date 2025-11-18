import { use, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import ArtistDTO from '@classes/ArtistDTO.js';
import { AuthContext } from '@context/AuthContext.jsx';
import { DataContext } from '@context/DataContext.jsx';
import { Main } from '@components/layout/exports';
import {
	FormItem,
	FormWithButtons,
	Input,
	InputErrorMessage,
} from '@components/input/exports.js';

let initialArtistData = { firstName: '', lastName: '', location: '' };

let errorMessages = {
	firstNameRequired: 'First name is required.',
	lastNameRequired: 'Last name is required.',
};

// FIXME: First Name and Last Name fields are not updating when attempting to type

const AddArtistForm = () => {
	const [artistData, setArtistData] = useState(initialArtistData);
	const [hasErrors, setHasErrors] = useState(false);
	const [submitting, setSubmitting] = useState(false);

	const navigate = useNavigate();

	const { auth } = use(AuthContext);
	const { fetchArtists } = use(DataContext);

	const inputRef = useRef(null);

	useEffect(() => {
		inputRef.current.focus();
	}, []);

	const saveNewArtist = async newArtistDTO => {
		try {
			const response = await fetch(
				'http://localhost:8080/api/artists/add',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Authorization: 'Bearer ' + auth.token,
					},
					body: JSON.stringify(newArtistDTO),
				},
			);

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(
					errorData.message || `ERROR - Status ${response.status}`,
				);
			} else {
				fetchArtists();
				navigate('/admin/artists');
			}
		} catch (error) {
			console.error(error.message);
		} finally {
			// TODO: Use toast or banner to notify user of success or failure
		}
	};

	const handleChange = event => {
		let updatedArtistData = {
			...artistData,
			[event.target.id]: event.target.value,
		};
		setArtistData(updatedArtistData);
	};

	const handleSubmit = event => {
		event.preventDefault();
		const artistDTO = new ArtistDTO(
			artistData.firstName,
			artistData.lastName,
			artistData.location,
		);
		if (!artistDTO.isValid()) {
			setSubmitting(false);
			setHasErrors(true);
		} else {
			setSubmitting(true);
			saveNewArtist(artistDTO);
		}
	};

	const buttonData = [
		{
			id: 'add-artist',
			type: 'submit',
			label: 'Add Artist',
			handleClick: handleSubmit,
			shouldDisable: submitting,
		},
	];

	return (
		<Main>
			<h1>Add Artist</h1>
			<FormWithButtons id='add-artist' buttonData={buttonData}>
				<FormItem id='add-artist-first-name'>
					<Input
						id='firstName'
						label='First Name'
						type='text'
						value={artistData.firstName}
						ref={inputRef}
						required={true}
						handleChange={handleChange}
					/>
					<InputErrorMessage
						hasError={hasErrors && artistData.firstName === ''}
						msg={errorMessages['firstNameRequired']}
					/>
				</FormItem>
				<FormItem id='add-artist-last-name'>
					<Input
						id='lastName'
						label='Last Name'
						type='text'
						value={artistData.lastName}
						required={true}
						handleChange={handleChange}
					/>
					<InputErrorMessage
						hasError={hasErrors && artistData.lastName === ''}
						msg={errorMessages['lastNameRequired']}
					/>
				</FormItem>
				<FormItem id='add-artist-location'>
					<Input
						id='location'
						label='Location'
						type='text'
						value={artistData.location}
						handleChange={handleChange}
					/>
				</FormItem>
			</FormWithButtons>
		</Main>
	);
};

export default AddArtistForm;
