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

/*********************** mergeCommonElements *************************/
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

/*********************** findTriangles *************************/
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

/*********************** stringMetrics *************************/
let stringMetrics = function (arr) {
  // Error check: Check if the argument is an array
  if (!Array.isArray(arr)) {
    throw new Error("Input must be an array.");
  }

  // Error check: Check if there are at least two strings in the array
  if (arr.length < 2) {
    throw new Error("There must be at least two strings in the array.");
  }

  // Filter out empty strings and validate that all elements are strings
  const filteredArr = arr.filter((str) => {
    if (typeof str !== "string") {
      throw new Error("All elements in the array must be strings.");
    }
    return str.trim() !== "";
  });

  // Error check: Check if there are still at least two non-empty strings
  if (filteredArr.length < 2) {
    throw new Error(
      "There must be at least two non-empty strings in the array."
    );
  }

  // Function to count vowels and consonants in a string
  function countVowelsConsonants(str) {
    const vowels = str.match(/[aeiou]/gi) || [];
    const consonants = str.match(/[^aeiou]/gi) || [];
    return { vowels: vowels.length, consonants: consonants.length };
  }

  // Calculate metrics for each string in the filtered array
  const metricsArr = filteredArr.map((str) => {
    const { vowels, consonants } = countVowelsConsonants(str);
    return {
      string: str,
      length: str.length,
      vowels,
      consonants,
    };
  });

  // Sort the metrics array by string length in descending order
  metricsArr.sort((a, b) => b.length - a.length);

  // Calculate mean
  const totalLength = metricsArr.reduce((sum, str) => sum + str.length, 0);
  const mean = parseFloat((totalLength / metricsArr.length).toFixed(2));

  // Calculate median
  let median;
  if (metricsArr.length % 2 === 0) {
    const midIndex1 = metricsArr.length / 2 - 1;
    const midIndex2 = metricsArr.length / 2;
    median = (metricsArr[midIndex1].length + metricsArr[midIndex2].length) / 2;
  } else {
    const midIndex = Math.floor(metricsArr.length / 2);
    median = metricsArr[midIndex].length;
  }

  // Calculate mode
  const lengthCounts = {};
  metricsArr.forEach((str) => {
    if (!lengthCounts[str.length]) {
      lengthCounts[str.length] = 1;
    } else {
      lengthCounts[str.length]++;
    }
  });

  let mode = null;
  const modeValues = [];
  for (const length in lengthCounts) {
    if (lengthCounts[length] > (mode || 0)) {
      mode = lengthCounts[length];
      modeValues.length = 0;
      modeValues.push(parseInt(length));
    } else if (lengthCounts[length] === mode) {
      modeValues.push(parseInt(length));
    }
  }

  // Determine the longest and shortest strings
  const longestLength = metricsArr[0].length;
  const longest = metricsArr
    .filter((str) => str.length === longestLength)
    .map((str) => str.string);
  const shortestLength = metricsArr[metricsArr.length - 1].length;
  const shortest = metricsArr
    .filter((str) => str.length === shortestLength)
    .map((str) => str.string);

  // Prepare the result object
  const result = {
    vowels: metricsArr.reduce((sum, str) => sum + str.vowels, 0),
    consonants: metricsArr.reduce((sum, str) => sum + str.consonants, 0),
    longest: longest.length === 1 ? longest[0] : longest,
    shortest: shortest.length === 1 ? shortest[0] : shortest,
    mean: mean,
    median: median,
    mode:
      modeValues.length === 1
        ? modeValues[0]
        : modeValues.length === 0
        ? null
        : modeValues,
  };

  return result;
};

export { mergeCommonElements, findTriangles, stringMetrics };
