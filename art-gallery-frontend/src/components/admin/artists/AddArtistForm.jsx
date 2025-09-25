import { useState, use } from 'react';
import { useNavigate } from 'react-router';
import { DataContext } from '../../../context/DataContext';
import InputErrorMessage from '../../common/InputErrorMsg';
import TextInput from '../../common/TextInput';

let initialArtist = {
	firstName: '',
	lastName: '',
	location: '',
};

let errorMessages = {
	firstNameRequired: 'First name is required.',
	lastNameRequired: 'Last name is required.',
};

// FUTURE: Alter width of fields at full page size and check responsive behavior

const AddArtistForm = () => {
	const [artist, setArtist] = useState(initialArtist);
	const [hasErrors, setHasErrors] = useState(false);

	const navigate = useNavigate();
	const { fetchArtists } = use(DataContext);

	const handleChange = event => {
		let updatedArtist = {
			...artist,
			[event.target.id]: event.target.value,
		};
		setArtist(updatedArtist);
	};

	const saveNewArtist = async artist => {
		try {
			const response = await fetch('http://localhost:8080/api/artists/add', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Access-Control-Allow-Origin': '*',
				},
				body: JSON.stringify(artist),
			});

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `ERROR - Status ${response.status}`);
            } else {
                fetchArtists(); // update state before returning to list
		        navigate('/admin/artists');
            }
		} catch (error) {
			console.error(error.message);
            
            // FUTURE: Use toast or banner to notify user that save was unsuccessful 
		}
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
		<main className="main-content">
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
