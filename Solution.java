
public class Solution {

    private static final int NOT_FOUND = -1;

    public int search(ArrayReader reader, int targetValue) {
        if (reader.get(0) == targetValue) {
            return 0;
        }
        int[] range = findRangeContainingTargetValue(reader, targetValue);
        return binarySearch(range, reader, targetValue);
    }

    /*
    Input size is not known but input values are sorted.
    Therefore, first search for the range containing targetValue.
     */
    private int[] findRangeContainingTargetValue(ArrayReader reader, int targetValue) {
        int lowerBoundary = 0;
        int upperBoundary = 1;
        while (reader.get(upperBoundary) < targetValue) {
            lowerBoundary = upperBoundary;
            upperBoundary <<= 1;
        }
        return new int[]{lowerBoundary, upperBoundary};
    }

    private int binarySearch(int[] range, ArrayReader reader, int targetValue) {

        int lowerBoundary = range[0];
        int upperBoundary = range[1];

        while (lowerBoundary <= upperBoundary) {
            int mid = lowerBoundary + (upperBoundary - lowerBoundary) / 2;
            if (reader.get(mid) == targetValue) {
                return mid;
            }
            if (reader.get(mid) < targetValue) {
                lowerBoundary = mid + 1;
            } else {
                upperBoundary = mid - 1;
            }
        }
        return NOT_FOUND;
    }
}


/*
ArrayReader's API interface is for information only.
It is implemented internally on leetcome.com and should 
not be included when running the code on the website.
 */
interface ArrayReader {

    public int get(int index);
}
