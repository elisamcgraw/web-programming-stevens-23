/* Todo: Implment the functions below and then export them
      using the ES6 exports syntax. 
      DO NOT CHANGE THE FUNCTION NAMES
*/

import { flattenArray, customSort } from './helpers.js';
  //this function takes in a variable number of arrays that's what the ...args signifies

// Function to check if at least two arrays are supplied
const checkInputArrayCount = (args) => {
  if (args.length < 2) {
    throw new Error('At least two arrays must be supplied as input');
  }
};

// Function to check if each input is an array
const checkInputArrays = (args) => {
  args.forEach((arr, index) => {
    if (!Array.isArray(arr) || arr.length === 0) {
      throw new Error(`Input at index ${index + 1} is not a non-empty array`);
    }
  });
};



// Function to check if each input array is not empty
const checkNonEmptyArrays = (args) => {
  args.forEach((arr, index) => {
    if (arr.length === 0) {
      throw new Error(`Input array at index ${index + 1} is empty`);
    }
  });
};


// Function to merge common elements from multiple arrays
let mergeCommonElements = (...args) => {
  // Check input array count
  checkInputArrayCount(args);

  // Check if each input is an array
  checkInputArrays(args);

  // Check if each input array is not empty
  checkNonEmptyArrays(args);

  // Flatten each input array
  const flattenedArrays = args.map((arr) => flattenArray(arr));

  // Find common elements
  const commonElements = flattenedArrays[0].filter((element) =>
    flattenedArrays.every((arr) => arr.includes(element))
  );

  // Sort numerically and alphabetically
  const sortedCommonElements = commonElements.sort(customSort);

  // Remove duplicates from the sortedCommonElements array
  const uniqueSortedCommonElements = Array.from(new Set(sortedCommonElements));

  return uniqueSortedCommonElements;
};

// Export the mergeCommonElements function
export { mergeCommonElements };





//let findTriangles = (arr) => {};

//let stringMetrics = (arr) => {};
