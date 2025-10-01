export default class Details {
	constructor(yearCreated, media, description, height, width, depth, imageId) {
		this.yearCreated = yearCreated;
		this.media = media;
		this.description = description;
		this.height = height;
		this.width = width;
		this.depth = depth;
		this.imageId = imageId;
	}

	isValid() {
		return (
			this.yearCreated.trim() &&
			this.media.trim() &&
			this.description.trim() &&
			this.height &&
			this.width &&
			this.imageId.trim()
		);
	}
}
