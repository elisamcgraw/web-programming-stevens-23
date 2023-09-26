/* TODO: Import the functions from your three modules here and write two test cases for each function.. You should have a total of 18 test cases. 
do not forget that you need to create the package.json and add the start command to run app.js as the starting script*/

import {
  mergeCommonElements,
  findTriangles,
  stringMetrics,
} from "./arrayUtils.js";
import { emojiCounter } from "./stringUtils.js";

try {
  /* arrayUtils */
  /*console.log(mergeCommonElements(["apple", "banana", "cherry"], ["cherry", "grape", "kiwi"], [1, 2, 3])); // []
    console.log(mergeCommonElements([1, [2, 3]], [[3, 4], [1, 2], [5, 6]], [3, [2, 3], 7])); // [2, 3]
    console.log(findTriangles([[3,3,3], [3,3,4], [5,4,2]]));   // returns {'0': [3.9,9, "equilateral"], '1': [4.47,10, "isosceles"], '2': [3.8,11, "scalene"]}
    console.log(findTriangles([[7,5,5], [2,4,3], [12,12,11]]));   // returns {'0': [12.5, 17, "isosceles"], '1': [2.90, 9, "scalene"], '2': [58.66,35, "isosceles"]}
    console.log(findTriangles([])); // Should return an empty object since there are no triangles
    console.log(findTriangles([[3, 4, 5], [1, 2, 3]]));
    console.log(findTriangles([5, 5, 5])); // throws an error
    console.log(stringMetrics(["hello", "patrick", "hill", "trees", "seventeen"])); //returns {vowels: 11, consonants: 19, longest: "seventeen", shortest: "hill", mean: 6, median:  5, mode: 5}
    console.log(stringMetrics(["john", "rob", "stark", "aegon"])); //returns {vowels: 6, consonants: 11, longest: ["aegon", "stark"], shortest: "rob", mean: 4.25, median:  4.5, mode: 5}
    console.log(stringMetrics(["apple"])); // throws an error */

  /* stringUtils */
  console.log(emojiCounter(":fire::fire:")); // Should return 2
  console.log(emojiCounter(":::fire:fire:")); // Should return 1
  console.log(emojiCounter(":fire::pregnant_man::fire:")); // Should return 3
  console.log(
    emojiCounter(
      "I am so happy :joy::joy: about scoring a :100: on my test! I feel :fire:! But ::100: doesn't count. Neither does :joy::100: in a row."
    )
  ); // Should return 7
  console.log(
    emojiCounter(
      "Today was :sunny::sunny:::rainy::sunny:::sunny:rainy::sunny::rainy:::sunny:::rainy:sunny:!"
    )
  ); // Should return 9
  console.log(emojiCounter("::")); // Should return 0
  console.log(emojiCounter("             ")); // Throws error
} catch (e) {
  console.error(e); // Print the error message
}
