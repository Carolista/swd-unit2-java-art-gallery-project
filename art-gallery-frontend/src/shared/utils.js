export const round = (number, decimalPlaces = 0) => {
	let factor = 10 ** decimalPlaces;
	return Math.round(number * factor) / factor;
};

export const sortObjById = array => {
	return array.sort((a, b) => a.id - b.id);
};

export const sortObjByString = (array, key1, key2 = null) => {
	if (key2)
		return array.sort((a, b) => a[key1][key2].localeCompare(b[key1][key2]));
	return array.sort((a, b) => a[key1].localeCompare(b[key1]));
};
