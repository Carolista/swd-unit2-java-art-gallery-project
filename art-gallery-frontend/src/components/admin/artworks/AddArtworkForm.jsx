import { useState, use } from 'react';
import { useNavigate } from 'react-router';
import { DataContext } from '../../../context/DataContext.jsx';
import {
	Checkbox,
	InputErrorMessage,
	Select,
	TextInput,
} from '../../common/_exports';
import TextArea from '../../common/TextArea.jsx';
import { sortObjByString } from '../../../shared/utils.js';
import Loading from '../../public/Loading.jsx';

let initialArtwork = {
	title: '',
	artistId: '',
	categoryIds: [],
};

let initialDetails = {
	description: '',
	yearCreated: '',
	media: '',
	height: 0,
	width: 0,
	depth: 0,
	imageId: '',
};

let errorMessages = {
	titleRequired: 'Title is required.',
	descriptionRequired: 'Description is required.',
	yearCreatedRequired: 'Year Created is required.',
	mediaRequired: 'Media is required.',
	heightRequired: 'Height (inches) is required.',
	widthRequired: 'Width (inches) is required',
	imageIdRequired: 'Image ID is required.',
	artistRequired: 'Artist is required.',
	categoryRequired: 'At least one category must be selected.',
};

const AddArtworkForm = () => {
	const { isLoading } = use(DataContext);

	if (isLoading) {
		return <Loading dataName="artists and categories" />;
	} else {
		const { allArtists, allCategories, fetchArtworks } = use(DataContext);

		const [artwork, setArtwork] = useState(initialArtwork);
		const [details, setDetails] = useState(initialDetails);
		const [checkboxes, setCheckboxes] = useState([]);
		const [hasErrors, setHasErrors] = useState(false);

		const sortedArtists = sortObjByString([...allArtists], 'lastName');
		const sortedCategories = sortObjByString([...allCategories], 'title');

		const navigate = useNavigate();

		const isValid = newArtwork => {
			return (
				newArtwork.title &&
				newArtwork.details.description &&
				newArtwork.details.yearCreated &&
				newArtwork.details.media &&
				newArtwork.details.height &&
				newArtwork.details.width &&
				newArtwork.details.imageId &&
				newArtwork.artistId &&
				newArtwork.categoryIds.length
			);
		};

		const handleArtworkChange = event => {
			let updatedArtwork = {
				...artwork,
				[event.target.id]: event.target.value,
			};
			setArtwork(updatedArtwork);
		};

		const handleDetailsChange = event => {
			let updatedDetails = {
				...details,
				[event.target.id]: event.target.value,
			};
			setDetails(updatedDetails);
		};

		const handleCategoryChange = event => {
			let updatedCheckboxes = [...checkboxes];
			updatedCheckboxes[event.target.value] = event.target.checked;
			setCheckboxes(updatedCheckboxes);
			// Will update categoryIds array within artwork object at submission
		};

		const saveNewArtwork = async artwork => {
			try {
				await fetch('http://localhost:8080/api/artworks/add', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						'Access-Control-Allow-Origin': '*',
					},
					body: JSON.stringify(artwork),
				});
				// DEMO TODO: Capture response and improve error handling
			} catch (error) {
				console.error(error.message);
			}
			fetchArtworks(); // update state before returning to list
			navigate('/admin/artworks');
		};

		const handleSubmit = event => {
			event.preventDefault();
			let newArtwork = { ...artwork };
			newArtwork.details = { ...details };
			checkboxes.forEach((checkbox, i) => {
				if (checkbox) newArtwork.categoryIds.push(i);
			});
			if (!isValid(newArtwork)) {
				setHasErrors(true);
			} else {
				saveNewArtwork(newArtwork);
			}
		};

		let artistOptionsJSX = sortedArtists.map(artist => {
			return (
				<option key={artist.id} id={artist.id} value={artist.id}>
					{artist.lastName}, {artist.firstName}
				</option>
			);
		});

		let categoryChoicesJSX = sortedCategories.map(category => {
			return (
				<Checkbox
					id={category.id}
					key={category.id}
					name="categoryIds"
					label={category.title}
					isChecked={checkboxes[category.id] || false}
					handleChange={handleCategoryChange}
				/>
			);
		});

		// FUTURE: Arrange categories in columns to reduce length of page
		/*
            Might require rearranging whole form using new grid layout
            Which would help providing for a responsive layout
            title       category1 category2
            artist
            year media
            H W D
            Desc
            Image Id
        */

		return (
			<main className="main-content">
				<h3>Add Artwork</h3>
				<form>
					<div className="container">
						<div className="row">
							<div className="form-item col-8">
								<TextInput
									id="title"
									label="Title"
									value={artwork.title}
									handleChange={handleArtworkChange}
								/>
								<InputErrorMessage
									hasError={hasErrors && artwork.title === ''}
									msg={errorMessages['titleRequired']}
								/>
							</div>
							<div className="form-item col-4">
								<Select
									id="artistId"
									label="Artist"
									handleChange={handleArtworkChange}>
									<option value="">Select an artist</option>
									{artistOptionsJSX}
								</Select>
								<InputErrorMessage
									hasError={hasErrors && artwork.artistId === 0}
									msg={errorMessages['artistRequired']}
								/>
							</div>
						</div>
						<div className="row">
							<div className="form-item col-2">
								<TextInput
									id="yearCreated"
									label="Year Created"
									value={details.yearCreated}
									handleChange={handleDetailsChange}
								/>
								<InputErrorMessage
									hasError={hasErrors && details.yearCreated === ''}
									msg={errorMessages['yearCreatedRequired']}
								/>
							</div>
							<div className="form-item col-4">
								<TextInput
									id="media"
									label="Media"
									value={details.media}
									handleChange={handleDetailsChange}
								/>
								<InputErrorMessage
									hasError={hasErrors && details.media === ''}
									msg={errorMessages['mediaRequired']}
								/>
							</div>
							<div className="form-item col-2">
								<TextInput
									id="height"
									label="Height (in.)"
									value={details.height}
									handleChange={handleDetailsChange}
								/>
								<InputErrorMessage
									hasError={hasErrors && details.height === 0}
									msg={errorMessages['heightRequired']}
								/>
							</div>
							<div className="form-item col-2">
								<TextInput
									id="width"
									label="Width (in.)"
									value={details.width}
									handleChange={handleDetailsChange}
								/>
								<InputErrorMessage
									hasError={hasErrors && details.width === 0}
									msg={errorMessages['widthRequired']}
								/>
							</div>
							<div className="form-item col-2">
								<TextInput
									id="depth"
									label="Depth (in.)"
									value={details.depth}
									handleChange={handleDetailsChange}
								/>
							</div>
						</div>
						<div className="row">
							<div className="form-item col">
								<TextArea
									id="description"
									label="Description"
									value={details.description}
									handleChange={handleDetailsChange}
								/>
								<InputErrorMessage
									hasError={hasErrors && details.description === ''}
									msg={errorMessages['descriptionRequired']}
								/>
							</div>
							<div className="col">
								<div className="row">
									<div className="form-item col">
										<TextInput
											id="imageId"
											label="Image ID"
											value={details.imageId}
											handleChange={handleDetailsChange}
										/>
										<InputErrorMessage
											hasError={hasErrors && details.imageId === ''}
											msg={errorMessages['imageIdRequired']}
										/>
									</div>
								</div>
								<div className="row">
									<h3>Categories</h3>
									<InputErrorMessage
										hasError={hasErrors && checkboxes.length === 0}
										msg={errorMessages['categoryRequired']}
									/>
									<div className="form-item col">{categoryChoicesJSX}</div>
								</div>
							</div>
						</div>
					</div>

					<button type="submit" onClick={handleSubmit}>
						Add Artwork
					</button>
				</form>
			</main>
		);
	}
};

export default AddArtworkForm;
