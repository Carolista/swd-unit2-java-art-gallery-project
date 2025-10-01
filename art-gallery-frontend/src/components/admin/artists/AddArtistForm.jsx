import { useState } from 'react';
import { InputErrorMessage, TextInput } from '../../common/exports.js';

let initialArtistData = {
	firstName: '',
	lastName: '',
	location: '',
};

let errorMessages = {
	firstNameRequired: 'First name is required.',
	lastNameRequired: 'Last name is required.',
};

const AddArtistForm = () => {
	const [artistData, setArtistData] = useState(initialArtistData);
	const [hasErrors, setHasErrors] = useState(false);

	// TODO: Access the fetchArtists function from context
	// TODO: Access the useNavigate() hook

	/*
        TODO: Write a function to handle the fetch request for posting a new artist
        Handle errors
        After a successful POST, update allArtists in context and navigate back to ArtistsList
    */

	const handleChange = event => {
		let updatedArtistData = {
			...artistData,
			[event.target.id]: event.target.value,
		};
		setArtistData(updatedArtistData);
	};

	const handleSubmit = event => {
		event.preventDefault();
		/* 
            TODO: 
            Create instance of ArtistDTO using artistData
            Run isValid() from DTO class to determine if errors should be activated
            If valid, pass ArtistDTO object to the function that makes the POST call
        */
	};

	return (
		<main className="main-content">
			<h3>Add Artist</h3>
			<form>
				<div className="form-item">
					<TextInput
						id="firstName"
						label="First Name"
						value={artistData.firstName}
						handleChange={handleChange}
					/>
					<InputErrorMessage
						hasError={hasErrors && artistData.firstName === ''}
						msg={errorMessages['firstNameRequired']}
					/>
				</div>
				<div className="form-item">
					<TextInput
						id="lastName"
						label="Last Name"
						value={artistData.lastName}
						handleChange={handleChange}
					/>
					<InputErrorMessage
						hasError={hasErrors && artistData.firstName === ''}
						msg={errorMessages['lastNameRequired']}
					/>
				</div>
				<div className="form-item">
					<TextInput
						id="location"
						label="Location"
						value={artistData.location}
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
