import { round } from '../shared/utils';

export default class Details {
	constructor(
		id,
		media,
		yearCreated,
		description,
		width,
		height,
		depth,
		imageId
	) {
		this.id = id;
		this.media = media;
		this.yearCreated = yearCreated;
		this.description = description;
		this.width = width;
		this.height = height;
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

    // TODO: update this once photos are hosted elsewhere
	getImageURL() {
		return 'https://drive.google.com/thumbnail?sz=w1000&id=' + this.imageId;
	}
}
