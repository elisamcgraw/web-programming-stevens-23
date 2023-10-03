/*
This file is where you will import your functions from the two other files and run test cases on your functions by calling them with various inputs.  
We will not use this file for grading and is only for your testing purposes to make sure: */

// 1. Your functions in your 2 files are exporting correctly.

// 2. They are returning the correct output based on the input supplied (throwing errors when you're supposed to, returning the right results etc..).

/* Note: 
1. You will need that calls your functions like the example below. 
2. Do not create any other files beside the 'package.json' - meaning your zip should only have the files and folder in this stub and a 'package.json' file.
3. Submit all files (including package.json) in a zip with your name in the following format: LastName_FirstName.zip.
4. DO NOT submit a zip containing your node_modules folder.

import * as authors from "./authors.js");

    try{
        const authorData = await authors.getAuthors();
        console.log (authorData);
    }catch(e){
        console.log (e);
    }
*/

/*********************** AUTHORS ***********************/

import * as authors from "./authors.js";

// TESTING FIRST FUNCTION

const testGetAuthorById = async () => {
  try {
    const author1 = await authors.getAuthorById(
      "1871e6d7-551f-41cb-9a07-08240b86c95c"
    );
    console.log("Test1: Author 1:", author1);
  } catch (error) {
    console.error("Error for Author 1:", error);
  }

  try {
    await authors.getAuthorById(-1); // Throws Error
    console.log("Test1: Author 2: No error");
  } catch (error) {
    console.error("Error for Author 2:", error);
  }

  try {
    await authors.getAuthorById(1001); // Throws Error
    console.log("Test1: Author 3: No error");
  } catch (error) {
    console.error("Error for Author 3:", error);
  }

  try {
    await authors.getAuthorById(); // Throws Error
    console.log("Test1: Author 4: No error");
  } catch (error) {
    console.error("Error for Author 4:", error);
  }

  try {
    await authors.getAuthorById("7989fa5e-5617-43f7-a931-46036f9dbcff"); // Throws Author not found Error
    console.log("Test1: Author 5: No error");
  } catch (error) {
    console.error("Error for Author 5:", error);
  }
};

// Call the test function
testGetAuthorById();

/*
 * OUTPUT
 * Author 1: {
  id: '1871e6d7-551f-41cb-9a07-08240b86c95c',
  first_name: 'Derward',
  last_name: 'Ticic',
  date_of_birth: '6/3/1932',
  HometownCity: 'Garden Grove',
  HometownState: 'CA',
  books: [ '4efdb199-5a0f-4410-bded-ce07990c6aa4' ]
}
Error for Author 2: Invalid argument: id must be a string
Error for Author 3: Invalid argument: id must be a string
Error for Author 4: Invalid argument: id must be a string
Error for Author 5: Author not found

 */

// TEST SECOND FUNCTION

const testSearchAuthorByName = async () => {
  try {
    const result1 = await authors.searchAuthorByName("Tom");
    console.log("Result 1:", result1);
  } catch (error) {
    console.error("Error for Result 1:", error);
  }

  try {
    await authors.searchAuthorByName("foobar");
    console.log("Result 2: No error");
  } catch (error) {
    console.error("Error for Result 2:", error);
  }

  try {
    await authors.searchAuthorByName(" ");
    console.log("Result 3: No error");
  } catch (error) {
    console.error("Error for Result 3:", error);
  }

  try {
    await authors.searchAuthorByName(123);
    console.log("Result 4: No error");
  } catch (error) {
    console.error("Error for Result 4:", error);
  }

  try {
    await authors.searchAuthorByName();
    console.log("Result 5: No error");
  } catch (error) {
    console.error("Error for Result 5:", error);
  }
};

testSearchAuthorByName();

// TEST THIRD FUNCTION
const testGetBookNames = async () => {
  try {
    const bookList1 = await authors.getBookNames("Prisca", "Vakhonin");
    console.log("Test1: Book List 1:", bookList1);
  } catch (error) {
    console.error("Error for Test1:", error);
  }

  try {
    await authors.getBookNames(123, 123); // Throws Error
    console.log("Test2: No error");
  } catch (error) {
    console.error("Error for Test2:", error);
  }

  try {
    await authors.getBookNames(" ", " "); // Throws Error
    console.log("Test3: No error");
  } catch (error) {
    console.error("Error for Test3:", error);
  }

  try {
    await authors.getBookNames("Patrick", "Hill"); // Throws Error
    console.log("Test4: No error");
  } catch (error) {
    console.error("Error for Test4:", error);
  }

  try {
    await authors.getBookNames("Perrine", "Greenough"); // Throws Error
    console.log("Test5: No error");
  } catch (error) {
    console.error("Error for Test5:", error);
  }

  try {
    await authors.getBookNames(); // Throws Error
    console.log("Test6: No error");
  } catch (error) {
    console.error("Error for Test6:", error);
  }
};

// Call the test function
testGetBookNames();

/**
 * OUTPUT
 * 
Test1: Book List 1: [ 'Good Thief, The', 'Point, The' ]
Error for Test2: Invalid argument: id must be a string
Error for Test3: Invalid argument: id cannot be empty
Error for Test4: Author Patrick Hill not found in authors.json
Error for Test5: Author Perrine Greenough has not written any books
Error for Test6: Invalid argument: id must be a string
 * 
 */

const testYoungestOldest = async () => {
    try {
      const result = await authors.youngestOldest();
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };
  
  testYoungestOldest();
  
   
  async function runTests() {
    try {
      const result1 = await authors.sameBirthday(10, 12);
      console.log(result1); // Should return ["Pancho Barradell", "Lauree Henriquet"]
    } catch (error) {
      console.error(error);
    }
  
    try {
      await authors.sameBirthday(9, 31); // Should throw an error
    } catch (error) {
      console.error(error); 
    }
  
    try {
      await authors.sameBirthday(13, 25); // Should throw an error
    } catch (error) {
      console.error(error); 
    }
  
    try {
      await authors.sameBirthday(2, 30); // Should throw an error
    } catch (error) {
      console.error(error); 
    }
  
    try {
      await authors.sameBirthday("09", "31"); // Should throw an error
    } catch (error) {
      console.error(error); 
    }
  
    try {
      await authors.sameBirthday(); // Should throw an error
    } catch (error) {
      console.error(error); 
    }
  }
  
  runTests();


