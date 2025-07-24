import { useState } from 'react';
import InputErrorMessage from '../../common/InputErrorMsg';
import TextInput from '../../common/TextInput';
import { useNavigate } from 'react-router';

let initialArtist = {
	firstName: '',
	lastName: '',
	location: '',
};

let errorMessages = {
	firstNameRequired: 'First name is required.',
	lastNameRequired: 'Last name is required.',
};

// TODO: Pass in function to re-fetch data after POST
const AddArtistForm = () => {
	const [artist, setArtist] = useState(initialArtist);
	const [hasErrors, setHasErrors] = useState(false);

	// TODO: Create reference to useNavigate() from react-router

	const handleChange = event => {
		let updatedArtist = {
			...artist,
			[event.target.id]: event.target.value,
		};
		setArtist(updatedArtist);
	};

	// TODO: Create new async function to make POST to backend with new artist data, re-fetch data, then navigate to list

	const handleSubmit = event => {
		event.preventDefault();
		if (artist.firstName === '' || artist.lastName === '') {
			setHasErrors(true);
		} else {
			// TODO: Call new save function and pass in artist data
		}
	};

	return (
		<main>
			<h3>Add Artist</h3>
			<form>
				<div className="form-item">
					<TextInput
						id="firstName"
						label="First Name"
						value={artist.firstName}
						handleChange={handleChange}
					/>
					<InputErrorMessage
						hasError={hasErrors && artist.firstName === ''}
						msg={errorMessages['firstNameRequired']}
					/>
				</div>
				<div className="form-item">
					<TextInput
						id="lastName"
						label="Last Name"
						value={artist.lastName}
						handleChange={handleChange}
					/>
					<InputErrorMessage
						hasError={hasErrors && artist.firstName === ''}
						msg={errorMessages['lastNameRequired']}
					/>
				</div>
				<div className="form-item">
					<TextInput
						id="location"
						label="Location"
						value={artist.location}
						handleChange={handleChange}
					/>
				</div>
				<button type="submit" onClick={handleSubmit}>
					Add Artist
				</button>
			</form>
		</main>
	);
};

export default AddArtistForm;
