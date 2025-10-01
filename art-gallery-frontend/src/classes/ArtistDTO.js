export default class ArtistDTO {
	constructor(firstName, lastName, location) {
		this.firstName = firstName;
		this.lastName = lastName;
		this.location = location;
	}

	isValid() {
		return this.firstName.trim() !== '' && this.lastName.trim() !== '';
	}
}
