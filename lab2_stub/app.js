/* TODO: Import the functions from your three modules here and write two test cases for each function.. You should have a total of 18 test cases. 
do not forget that you need to create the package.json and add the start command to run app.js as the starting script*/

import {
    mergeCommonElements,
    findTriangles,
    //stringMetrics

} from './arrayUtils.js';

try {
    /* Merge Common Elements */
    //console.log(mergeCommonElements(["apple", "banana", "cherry"], ["cherry", "grape", "kiwi"], [1, 2, 3])); // []
    //console.log(mergeCommonElements([1, [2, 3]], [[3, 4], [1, 2], [5, 6]], [3, [2, 3], 7])); // [2, 3]
    console.log(findTriangles([[3,3,3], [3,3,4], [5,4,2]]));   // returns {'0': [3.9,9, "equilateral"], '1': [4.47,10, "isosceles"], '2': [3.8,11, "scalene"]}
    console.log(findTriangles([[7,5,5], [2,4,3], [12,12,11]]));   // returns {'0': [12.5, 17, "isosceles"], '1': [2.90, 9, "scalene"], '2': [58.66,35, "isosceles"]}
    console.log(findTriangles([])); // Should return an empty object since there are no triangles
    console.log(findTriangles([[3, 4, 5], [1, 2, 3]]));
    console.log(findTriangles([5, 5, 5])); // throws an error



} catch (e) {
  console.error(e); // Print the error message
}

