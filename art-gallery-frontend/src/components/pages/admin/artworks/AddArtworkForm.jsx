import { useState, use, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { ArtworkDTO, DetailsDTO } from '@classes/exports.js';
import { AuthContext } from '@context/AuthContext.jsx';
import { DataContext } from '@context/DataContext.jsx';
import { sortObjByString } from '@shared/utils.js';
import { Main } from '@components/layout/exports';
import {
	Checkbox,
	FormGroup,
	FormItem,
	FormWithButtons,
	Input,
	InputErrorMessage,
	Select,
	TextArea,
} from '@components/input/exports.js';

let initialArtworkData = { title: '', artistId: '', categoryIds: [] };

let initialDetailsData = {
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
	const [artworkData, setArtworkData] = useState(initialArtworkData);
	const [detailsData, setDetailsData] = useState(initialDetailsData);
	const [checkboxes, setCheckboxes] = useState([]);
	const [hasErrors, setHasErrors] = useState(false);
	const [submitting, setSubmitting] = useState(false);

	const { allArtists, allCategories, fetchArtworks } = use(DataContext);

	const sortedArtists = sortObjByString([...allArtists], 'lastName');
	const sortedCategories = sortObjByString([...allCategories], 'title');

	const { auth } = use(AuthContext);

	const navigate = useNavigate();

	const inputRef = useRef(null);

	useEffect(() => {
		inputRef.current.focus();
	}, []);

	const saveNewArtwork = async newArtworkDTO => {
		try {
			const response = await fetch(
				'http://localhost:8080/api/artworks/add',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Authorization: 'Bearer ' + auth.token,
					},
					body: JSON.stringify(newArtworkDTO),
				},
			);

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(
					errorData.message || `ERROR - Status ${response.status}`,
				);
			} else {
				fetchArtworks();
				navigate('/admin/artworks');
			}
		} catch (error) {
			console.error(error.message);
		} finally {
			// TODO: Use toast or banner to notify user of success or failure
		}
	};

	const handleArtworkChange = event => {
		let updatedArtworkData = {
			...artworkData,
			[event.target.id]: event.target.value,
		};
		setArtworkData(updatedArtworkData);
	};

	const handleDetailsChange = event => {
		let updatedDetailsData = {
			...detailsData,
			[event.target.id]: event.target.value,
		};
		setDetailsData(updatedDetailsData);
	};

	const handleCategoryChange = event => {
		let updatedCheckboxes = [...checkboxes];
		updatedCheckboxes[event.target.value] = event.target.checked;
		setCheckboxes(updatedCheckboxes);
	};

	const handleSubmit = event => {
		event.preventDefault();
		checkboxes.forEach((checkbox, i) => {
			if (checkbox) artworkData.categoryIds.push(i);
		});
		let detailsDTO = new DetailsDTO(
			detailsData.yearCreated,
			detailsData.media,
			detailsData.description,
			detailsData.height,
			detailsData.width,
			detailsData.depth,
			detailsData.imageId,
		);
		let artworkDTO = new ArtworkDTO(
			artworkData.title,
			artworkData.artistId,
			artworkData.categoryIds,
			detailsDTO,
		);
		if (!detailsDTO.isValid() || !artworkDTO.isValid()) {
			setSubmitting(false);
			setHasErrors(true);
		} else {
			setSubmitting(true);
			saveNewArtwork(artworkDTO);
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
				name='categoryIds'
				label={category.title}
				isChecked={checkboxes[category.id] || false}
				handleChange={handleCategoryChange}
			/>
		);
	});

	const buttonData = [
		{
			id: 'add-artwork',
			type: 'submit',
			label: 'Add Artwork',
			handleClick: handleSubmit,
			shouldDisable: submitting,
		},
	];

	return (
		<Main>
			<h1>Add Artwork</h1>
			<FormWithButtons id='add-artwork' buttonData={buttonData}>
				<FormItem id='add-artwork-title'>
					<Input
						id='title'
						label='Title'
						type='text'
						value={artworkData.title}
						ref={inputRef}
						required={true}
						handleChange={handleArtworkChange}
					/>
					<InputErrorMessage
						hasError={hasErrors && artworkData.title === ''}
						msg={errorMessages['titleRequired']}
					/>
				</FormItem>
				<FormItem id='add-artwork-artist-id'>
					<Select
						id='artist-id'
						label='Artist'
						required={true}
						handleChange={handleArtworkChange}>
						<option value=''>Select an artist...</option>
						{artistOptionsJSX}
					</Select>
					<InputErrorMessage
						hasError={hasErrors && !artworkData.artistId}
						msg={errorMessages['artistRequired']}
					/>
				</FormItem>

				<FormItem id='add-artwork-year-created'>
					<Input
						id='year-created'
						label='Year Created'
						type='text'
						value={detailsData.yearCreated}
						required={true}
						handleChange={handleDetailsChange}
					/>
					<InputErrorMessage
						hasError={hasErrors && detailsData.yearCreated === ''}
						msg={errorMessages['yearCreatedRequired']}
					/>
				</FormItem>
				<FormItem id='add-artwork-media'>
					<Input
						id='media'
						label='Media'
						type='text'
						value={detailsData.media}
						required={true}
						handleChange={handleDetailsChange}
					/>
					<InputErrorMessage
						hasError={hasErrors && detailsData.media === ''}
						msg={errorMessages['mediaRequired']}
					/>
				</FormItem>
				<FormItem id='add-artwork-height'>
					<Input
						id='height'
						label='Height (in.)'
						type='number'
						value={detailsData.height}
						required={true}
						handleChange={handleDetailsChange}
					/>
					<InputErrorMessage
						hasError={hasErrors && detailsData.height === 0}
						msg={errorMessages['heightRequired']}
					/>
				</FormItem>
				<FormItem id='add-artwork-width'>
					<Input
						id='width'
						label='Width (in.)'
						type='number'
						value={detailsData.width}
						required={true}
						handleChange={handleDetailsChange}
					/>
					<InputErrorMessage
						hasError={hasErrors && detailsData.width === 0}
						msg={errorMessages['widthRequired']}
					/>
				</FormItem>
				<FormItem id='add-artwork-depth'>
					<Input
						id='depth'
						label='Depth (in.)'
						type='number'
						value={detailsData.depth}
						handleChange={handleDetailsChange}
					/>
				</FormItem>

				<FormItem id='add-artwork-description'>
					<TextArea
						id='description'
						label='Description'
						value={detailsData.description}
						required={true}
						handleChange={handleDetailsChange}
					/>
					<InputErrorMessage
						hasError={hasErrors && detailsData.description === ''}
						msg={errorMessages['descriptionRequired']}
					/>
				</FormItem>

				<FormItem id='add-artwork-image-id'>
					<Input
						id='image-id'
						label='Image ID'
						type='text'
						value={detailsData.imageId}
						required={true}
						handleChange={handleDetailsChange}
					/>
					<InputErrorMessage
						hasError={hasErrors && detailsData.imageId === ''}
						msg={errorMessages['imageIdRequired']}
					/>
				</FormItem>

				<h2 id='add-artwork-categories-subtitle'>Categories</h2>
				<InputErrorMessage
					hasError={hasErrors && checkboxes.length === 0}
					msg={errorMessages['categoryRequired']}
				/>
				<FormGroup id='add-artwork-categories'>
					{categoryChoicesJSX}
				</FormGroup>
			</FormWithButtons>
		</Main>
	);
};

export default AddArtworkForm;
