export default class ArtworkDTO {
	constructor(title, artistId, categoryIds, details) {
		this.title = title;
		this.artistId = artistId;
		this.categoryIds = categoryIds;
		this.details = details;
	}

	isValid() {
		return this.title.trim() && this.artistId && this.categoryIds.length;
	}
}
