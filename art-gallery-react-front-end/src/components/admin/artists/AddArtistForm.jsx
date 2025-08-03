import { useContext, useState } from 'react';
import InputErrorMessage from '../../common/InputErrorMsg';
import TextInput from '../../common/TextInput';
import { useNavigate } from 'react-router';
import { AuthContext } from '../../../context/AuthContext';

let initialArtist = {
	firstName: '',
	lastName: '',
	location: '',
};

let errorMessages = {
	firstNameRequired: 'First name is required.',
	lastNameRequired: 'Last name is required.',
};

const AddArtistForm = ({ refetch }) => {
	const { auth } = useContext(AuthContext);

	const navigate = useNavigate();

	const [artist, setArtist] = useState(initialArtist);
	const [hasErrors, setHasErrors] = useState(false);

	const handleChange = event => {
		let updatedArtist = {
			...artist,
			[event.target.id]: event.target.value,
		};
		setArtist(updatedArtist);
	};

	const saveNewArtist = async newArtist => {
		try {
			await fetch('http://localhost:8080/api/artists/add', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + auth.token,
				},
				body: JSON.stringify(newArtist),
			});
		} catch (error) {
			console.error(error.message);
		}
		refetch();
		navigate('/admin/artists');
	};

	const handleSubmit = event => {
		event.preventDefault();
		if (artist.firstName === '' || artist.lastName === '') {
			setHasErrors(true);
		} else {
			saveNewArtist(artist);
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
