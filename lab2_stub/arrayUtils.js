/* Todo: Implment the functions below and then export them
      using the ES6 exports syntax. 
      DO NOT CHANGE THE FUNCTION NAMES
*/

import { flattenArray, customSort } from "./helpers.js";

/****************************** Error Checks *******************************/

// Function to check if at least two arrays are supplied
const checkInputArrayCount = (args) => {
  if (args.length < 2) {
    throw new Error("At least two arrays must be supplied as input");
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

// Function to check if an argument is a 2D array of arrays
const isArrayofArrays = (arr) => {
  if (!Array.isArray(arr) || !arr.every((subArr) => Array.isArray(subArr))) {
    throw new Error("Input must be a 2D array of arrays");
  }
};

// Function to check if each subarray is a valid triangle
const areSubarraysTriangles = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    const sides = arr[i];

    if (
      sides.length !== 3 ||
      !sides.every((side) => typeof side === "number")
    ) {
      throw new Error(`Input at index ${i} is not a valid triangle`);
    }

    const [a, b, c] = sides;

    if (!(a + b > c && a + c > b && b + c > a)) {
      throw new Error(`Input at index ${i} does not form a valid triangle`);
    }
  }
};

// Function to check if each subarray contains only numbers, is not empty, and trims empty spaces
const areSubarraysValid = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    let sides = arr[i].map((side) =>
      typeof side === "string" ? side.trim() : side
    ); // Trim empty spaces from sides if they are strings

    if (
      sides.length !== 3 ||
      !sides.every((side) => typeof side === "number")
    ) {
      throw new Error(`Input at index ${i} is not a valid triangle`);
    }

    if (sides.some((side) => isNaN(side))) {
      throw new Error(`Input at index ${i} contains non-numeric values`);
    }

    if (sides.some((side) => side <= 0)) {
      throw new Error(`Input at index ${i} contains non-positive values`);
    }
  }
};

/****************************** Lab Functions Implementation  ******************************/

//This function takes in a variable number of arrays that's what the ...args signifies
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

let findTriangles = (arr) => {
  // Check if the input is a 2D array of arrays
  isArrayofArrays(arr);

  // Check if each subarray is a valid triangle
  areSubarraysTriangles(arr);

  // Check if each subarray contains only numbers and is not empty
  areSubarraysValid(arr);

  const result = {};

  for (let i = 0; i < arr.length; i++) {
    const sides = arr[i];
    const [a, b, c] = sides;

    const s = (a + b + c) / 2;
    const area = parseFloat(
      Math.sqrt(s * (s - a) * (s - b) * (s - c)).toFixed(2)
    );
    const perimeter = a + b + c;

    let triangleType;
    if (a === b && b === c) {
      triangleType = "equilateral";
    } else if (a === b || b === c || a === c) {
      triangleType = "isosceles";
    } else {
      triangleType = "scalene";
    }

    result[i] = [area, perimeter, triangleType];
  }

  return result;
};

export { mergeCommonElements, findTriangles };
