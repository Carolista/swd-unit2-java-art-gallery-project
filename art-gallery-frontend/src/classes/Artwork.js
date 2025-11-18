export default class Artwork {
	constructor(id, title, artist, categories, details) {
		this.id = id;
		this.title = title;
		this.artist = artist;
		this.categories = categories;
		this.details = details;
	}

	getFormattedCategories() {
		return this.categories.map(category => category.title).join(', ');
	}
}
