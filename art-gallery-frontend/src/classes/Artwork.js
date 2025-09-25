export default class Artwork {
	constructor(id, title, artist, categories, details) {
		this.id = id;
		this.title = title;
		this.artist = artist; // Artist object
		this.categories = categories; // array of Category objects
		this.details = details; // Details object
	}

	getFormattedCategories() {
		return this.categories.map(category => category.title).join(', ');
	}
}
