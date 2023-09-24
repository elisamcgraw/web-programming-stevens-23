/* TODO: Import the functions from your three modules here and write two test cases for each function.. You should have a total of 18 test cases. 
do not forget that you need to create the package.json and add the start command to run app.js as the starting script*/

import {
    mergeCommonElements,
    //findTriangle,
    //stringMetrics

} from './arrayUtils.js';

try {
    /* Merge Common Elements */
    console.log(mergeCommonElements(["apple", "banana", "cherry"], ["cherry", "grape", "kiwi"], [1, 2, 3])); // []
    console.log(mergeCommonElements([1, [2, 3]], [[3, 4], [1, 2], [5, 6]], [3, [2, 3], 7])); // [2, 3]

    
} catch (e) {
  console.error(e); // Print the error message
}

