export default class CategoryDTO {
	constructor(title) {
		this.title = title;
	}

    isValid() {
        return this.title !== "";
    }
}
