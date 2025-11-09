import { use, useState } from 'react';
import { useNavigate } from 'react-router';
import { InputErrorMessage, TextInput } from '../../common/exports.js';
import { DataContext } from '../../../context/DataContext.jsx';
import ArtistDTO from '../../../classes/ArtistDTO.js';
import { AuthContext } from '../../../context/AuthContext.jsx';

let initialArtistData = { firstName: '', lastName: '', location: '' };

let errorMessages = {
	firstNameRequired: 'First name is required.',
	lastNameRequired: 'Last name is required.',
};

const AddArtistForm = () => {
	const [artistData, setArtistData] = useState(initialArtistData);
	const [hasErrors, setHasErrors] = useState(false);

	const navigate = useNavigate();

	const { auth } = use(AuthContext);
	const { fetchArtists } = use(DataContext);

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
				fetchArtists(); // update state before returning to list
				navigate('/admin/artists');
			}
		} catch (error) {
			console.error(error.message);
		} finally {
			// Use toast or banner to notify user of success or failure
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
			setHasErrors(true);
		} else {
			saveNewArtist(artistDTO);
		}
	};

	return (
		<main className='main-content'>
			<h3>Add Artist</h3>
			<form>
				<div className='form-item'>
					<TextInput
						id='firstName'
						label='First Name'
						value={artistData.firstName}
						handleChange={handleChange}
					/>
					<InputErrorMessage
						hasError={hasErrors && artistData.firstName === ''}
						msg={errorMessages['firstNameRequired']}
					/>
				</div>
				<div className='form-item'>
					<TextInput
						id='lastName'
						label='Last Name'
						value={artistData.lastName}
						handleChange={handleChange}
					/>
					<InputErrorMessage
						hasError={hasErrors && artistData.firstName === ''}
						msg={errorMessages['lastNameRequired']}
					/>
				</div>
				<div className='form-item'>
					<TextInput
						id='location'
						label='Location'
						value={artistData.location}
						handleChange={handleChange}
					/>
				</div>
				<button type='submit' onClick={handleSubmit}>
					Add Artist
				</button>
			</form>
		</main>
	);
};

export default AddArtistForm;
