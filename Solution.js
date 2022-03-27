
/**
 * @param {ArrayReader} reader
 * @param {number} targetValue
 * @return {number}
 */
var search = function (reader, targetValue) {
    if (reader.get(0) === targetValue) {
        return 0;
    }
    this.NOT_FOUND = -1;
    const range = findRangeContainingTargetValue(reader, targetValue);

    return binarySearch(range, reader, targetValue);
};


/**
 * Input size is not known but input values are sorted.
 * Therefore, first search for the range containing targetValue.
 * 
 * @param {ArrayReader} reader
 * @param {number} targetValue
 * @return {number}
 */
function findRangeContainingTargetValue(reader, targetValue) {
    let lowerBoundary = 0;
    let upperBoundary = 1;
    while (reader.get(upperBoundary) < targetValue) {
        lowerBoundary = upperBoundary;
        upperBoundary <<= 1;
    }
    return [lowerBoundary, upperBoundary];
}

/**
 * @param {number[]} range
 * @param {ArrayReader} reader
 * @param {number} targetValue
 * @return {number}
 */
function binarySearch(range, reader, targetValue) {

    let lowerBoundary = range[0];
    let upperBoundary = range[1];

    while (lowerBoundary <= upperBoundary) {
        let mid = lowerBoundary + Math.floor((upperBoundary - lowerBoundary) / 2);
        if (reader.get(mid) === targetValue) {
            return mid;
        }
        if (reader.get(mid) < targetValue) {
            lowerBoundary = mid + 1;
        } else {
            upperBoundary = mid - 1;
        }
    }
    return this.NOT_FOUND;
}

/*
 * ArrayReader's API interface is for information only.
 * It is implemented internally on leetcome.com and should 
 * not be included when running the code on the website.
 */
function ArrayReader() {
    /*
     * @param {number} index
     * @return {number}
     */
    this.get = function (index) {};
}
