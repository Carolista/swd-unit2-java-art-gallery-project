export const round = (number, decimalPlaces = 0) => {
    let factor = 10**decimalPlaces;
    return Math.round(number * factor) / factor;
}

// NOTE: Use these sort functions carefully!
// If you don't intend to mutate the original array, pass in a copy
// e.g., [...array]

export const sortObjById = (array) => {
    return array.sort((a, b) => a.id < b.id);
}

export const sortObjByString = (array, keyName) => {
    return array.sort((a, b) => a[keyName].localeCompare(b[keyName]));
}
