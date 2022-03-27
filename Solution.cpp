
/*
ArrayReader's API interface is for information only.
It is implemented internally on leetcome.com and should
not be included when running the code on the website.
 */
class ArrayReader {
public:
    int get(int index) const;
};

class Solution {
    
    inline static const int NOT_FOUND = -1;

public:

    int search(const ArrayReader& reader, int targetValue) {
        if (reader.get(0) == targetValue) {
            return 0;
        }
        array<int, 2> range = findRangeContainingTargetValue(reader, targetValue);        
        return binarySearch(range, reader, targetValue);
    }

private:

    /*
    Input size is not known but input values are sorted.
    Therefore, first search for the range containing targetValue.
     */
    array<int, 2> findRangeContainingTargetValue(const ArrayReader& reader, int targetValue) {
        int lowerBoundary = 0;
        int upperBoundary = 1;
        while (reader.get(upperBoundary) < targetValue) {
            lowerBoundary = upperBoundary;
            upperBoundary <<= 1;
        }
        return array<int, 2>{lowerBoundary, upperBoundary};
    }

    int binarySearch(const array<int, 2>& range, const ArrayReader& reader, int targetValue) {

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
};
