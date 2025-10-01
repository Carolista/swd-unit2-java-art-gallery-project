// This makes it easy to form up an object that will match
// the JSON structure the API is expecting for a POST call

export default class ArtworkDTO {
	constructor(title, artistId, categoryIds, details) {
		this.title = title;
		this.artistId = artistId; // artist's id
		this.categoryIds = categoryIds; // array of category ids
		this.details = details; // DetailsDTO object
	}

    isValid() {
        return this.title.trim() && this.artistId && this.categoryIds.length;
    }
}
