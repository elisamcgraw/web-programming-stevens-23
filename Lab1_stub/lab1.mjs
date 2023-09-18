
/** Question 1 */
export const questionOne = (arr) => {

  // Count the vowels inside a string str
  function vowelCount(str) {
    const vowels = ['A', 'E', 'I', 'O', 'U'];
    let count = 0;
    for (let char of str.toUpperCase()){
      if (vowels.includes(char)) {
        count++;
      }
    }
    // Return the number of vowels in the string as an integer
    return count; 
  } // end of vowelCount function


  // Calculate the total sum of vowels 
  let totalVowels = 0;
  for (let str of arr) {
    totalVowels += vowelCount(str);
  }

  // Check if the total number of vowels is even
  const isEven = totalVowels % 2 == 0;

  return [totalVowels, isEven]; //return result
};

/** Question 2 */
export const questionTwo = (obj1, obj2) => {
  
  // Extract keys from both obj1 and obj2 
  const key1 = Object.keys(obj1);
  const key2 = Object.keys(obj2);

  // Find keys that are unique to obj1 by using the filter method and turning them into two arrays
  const uniqueKeystoObj1 = key1.filter((key) => !key2.includes(key));

  // Find keys that are unique to onj2 by using the filter method
  const uniqueKeystoObj2 = key2.filter((key) => !key1.includes(key));

  // Combine both arrats into a single array and use the spread operator to concatenate them
  const combinedUniqueKeys = [...uniqueKeystoObj1, ...uniqueKeystoObj2].sort((a,b) => {
    
    // Check if both keys are numeric strings 
    if (!isNaN(a) && !isNaN(b)) {
      // If both keys are numeric, convert them to numbers 
      return parseFloat(a) - parseFloat(b);
    }

    // If either key is not a numeric string or if they're equal numerically, sort them alphabetically
    return a.localeCompare(b);
  });

  return combinedUniqueKeys; //return result
};

/** Question 3 */
export const questionThree = (arr) => {
  // Initialize an empty object to store the results
  const results = {};

  // Define a function to calculate the area of a triangle
  const calculateArea = (sides) => {
    const [a, b, c] = sides;
    const s = (a + b + c) / 2;
    const area = Math.sqrt(s * (s - a) * (s - b) * (s - c));
    return parseFloat(area.toFixed(2)); // Round the area to 2 decimal places
  };

  // Define a function to calculate the perimeter of a triangle
  const calculatePerimeter = (sides) => {
    return sides.reduce((sum, side) => sum + side, 0);
  };

  // Iterate through the input array and calculate area and perimeter for each triangle
  for (let i = 0; i < arr.length; i++) {
    const sides = arr[i];
    const area = calculateArea(sides);
    const perimeter = calculatePerimeter(sides);

    // Store the results in the 'results' object using the index as the key
    results[i] = [area, perimeter];
  }

  return results; //return result
};

export const questionFour = (string) => {
  // Implement question 4 here
  return; //return result
};

//DO NOT FORGET TO UPDATE THE INFORMATION BELOW OR IT WILL BE -2 POINTS PER FIELD THAT IS MISSING.
export const studentInfo = {
  firstName: 'ELISA',
  lastName: 'MCGRAW',
  studentId: '10477483'
};

