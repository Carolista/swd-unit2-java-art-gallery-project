export default class Artwork {
	constructor(id, title, details, artist, categories) {
		this.id = id;
		this.title = title;
		this.details = details; // ArtworkDetails object
		this.artist = artist; // Artist object
		this.categories = categories; // array of Category objects
	}

	getFormattedCategories() {
        return this.categories.map(category => category.title).join(", ");
	}
}
