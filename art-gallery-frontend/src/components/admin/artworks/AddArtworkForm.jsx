import { useState, use } from 'react';
import { DataContext } from '../../../context/DataContext.jsx';
import {
	Checkbox,
	InputErrorMessage,
	Select,
	TextArea,
	TextInput,
} from '../../common/exports.js';
import { sortObjByString } from '../../../shared/utils.js';
import { Loading } from '../../public/exports.js';
import { ArtworkDTO, DetailsDTO } from '../../../classes/exports.js';

let initialArtworkData = {
	title: '',
	artistId: '',
	categoryIds: [],
};

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
	const { isLoading } = use(DataContext);

	if (isLoading) {
		return <Loading dataName="artists and categories" />;
	} else {

		// TODO: Access the fetchArtists function from context
		const { allArtists, allCategories } = use(DataContext);

		const [artworkData, setArtworkData] = useState(initialArtworkData);
		const [detailsData, setDetailsData] = useState(initialDetailsData);
		const [checkboxes, setCheckboxes] = useState([]);
		const [hasErrors, setHasErrors] = useState(false);

		const sortedArtists = sortObjByString([...allArtists], 'lastName');
		const sortedCategories = sortObjByString([...allCategories], 'title');

		// TODO: Access the useNavigate() hook

        /*
            TODO: Write a function to handle the fetch request for posting a new artwork
            Handle errors
            After a successful POST, update allArtworks in context and navigate back to ArtworksList
        */

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
			// This is just to keep track of the user's selections before submission
			// The actual categoryIds array within the artwork object will be filled later
		};

		const handleSubmit = event => {
			event.preventDefault();
            /* 
                TODO: 
                Loop over the checkboxes array and add the index to artworkData.categoryIds for any checked boxes
                Create an instance of DetailsDTO using detailsData
                Create instance of ArtistDTO using artistData
                Run isValid() from both DTO classes to determine if errors should be activated
                If valid, pass ArtworkDTO object to the function that makes the POST call
            */
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
				detailsData.imageId
			);
			let artworkDTO = new ArtworkDTO(
				artworkData.title,
				artworkData.artistId,
				artworkData.categoryIds,
				detailsDTO
			);
			if (!detailsDTO.isValid() || !artworkDTO.isValid()) {
				setHasErrors(true);
			} else {
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
					name="categoryIds"
					label={category.title}
					isChecked={checkboxes[category.id] || false}
					handleChange={handleCategoryChange}
				/>
			);
		});

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
									value={artworkData.title}
									handleChange={handleArtworkChange}
								/>
								<InputErrorMessage
									hasError={hasErrors && artworkData.title === ''}
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
									hasError={hasErrors && artworkData.artistId === 0}
									msg={errorMessages['artistRequired']}
								/>
							</div>
						</div>
						<div className="row">
							<div className="form-item col-2">
								<TextInput
									id="yearCreated"
									label="Year Created"
									value={detailsData.yearCreated}
									handleChange={handleDetailsChange}
								/>
								<InputErrorMessage
									hasError={hasErrors && detailsData.yearCreated === ''}
									msg={errorMessages['yearCreatedRequired']}
								/>
							</div>
							<div className="form-item col-4">
								<TextInput
									id="media"
									label="Media"
									value={detailsData.media}
									handleChange={handleDetailsChange}
								/>
								<InputErrorMessage
									hasError={hasErrors && detailsData.media === ''}
									msg={errorMessages['mediaRequired']}
								/>
							</div>
							<div className="form-item col-2">
								<TextInput
									id="height"
									label="Height (in.)"
									value={detailsData.height}
									handleChange={handleDetailsChange}
								/>
								<InputErrorMessage
									hasError={hasErrors && detailsData.height === 0}
									msg={errorMessages['heightRequired']}
								/>
							</div>
							<div className="form-item col-2">
								<TextInput
									id="width"
									label="Width (in.)"
									value={detailsData.width}
									handleChange={handleDetailsChange}
								/>
								<InputErrorMessage
									hasError={hasErrors && detailsData.width === 0}
									msg={errorMessages['widthRequired']}
								/>
							</div>
							<div className="form-item col-2">
								<TextInput
									id="depth"
									label="Depth (in.)"
									value={detailsData.depth}
									handleChange={handleDetailsChange}
								/>
							</div>
						</div>
						<div className="row">
							<div className="form-item col">
								<TextArea
									id="description"
									label="Description"
									value={detailsData.description}
									handleChange={handleDetailsChange}
								/>
								<InputErrorMessage
									hasError={hasErrors && detailsData.description === ''}
									msg={errorMessages['descriptionRequired']}
								/>
							</div>
							<div className="col">
								<div className="row">
									<div className="form-item col">
										<TextInput
											id="imageId"
											label="Image ID"
											value={detailsData.imageId}
											handleChange={handleDetailsChange}
										/>
										<InputErrorMessage
											hasError={hasErrors && detailsData.imageId === ''}
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
