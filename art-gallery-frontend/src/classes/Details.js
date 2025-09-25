import { round } from '../shared/utils';

export default class Details {
	constructor(
		id,
		media,
		yearCreated,
		description,
		height,
		width,
		depth,
		imageId
	) {
		this.id = id;
		this.media = media;
		this.yearCreated = yearCreated;
		this.description = description;
		this.height = height;
		this.width = width;
		this.depth = depth;
		this.imageId = imageId;
	}

	getDimensions() {
		let useFeet = this.height > 48 || this.width > 48;

        let dims = {
            H: this.height,
            W: this.width,
            D: this.depth
        };

        let formatted = [];

        for (let key of Object.keys(dims)) {
            let dim = dims[key];
            if (dim) {
                if (useFeet) {
                    let feet = Math.floor(dim / 12);
                    let inches = round(dim % 12);
                    formatted.push(`${feet}'${inches}" ${key}`);
                } else {
                    formatted.push(`${dim}" ${key}`)
                }
            }
        }

		return formatted.join(" x ");
	}

    // FIXME: update this once photos are hosted elsewhere
	getImageURL() {
		return 'https://i.ibb.co/' + this.imageId;
	}
}
