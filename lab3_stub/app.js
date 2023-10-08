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

/*
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

testGetAuthorById();


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

const testGetBookNames = async () => {
  try {
    const bookList1 = await authors.getBookNames("Prisca", "Vakhonin");
    console.log("Test1: Book List 1:", bookList1);
  } catch (error) {
    console.error("Error for Test1:", error);
  }

  try {
    await authors.getBookNames(123, 123); 
    console.log("Test2: No error");
  } catch (error) {
    console.error("Error for Test2:", error);
  }

  try {
    await authors.getBookNames(" ", " "); 
    console.log("Test3: No error");
  } catch (error) {
    console.error("Error for Test3:", error);
  }

  try {
    await authors.getBookNames("Patrick", "Hill");
    console.log("Test4: No error");
  } catch (error) {
    console.error("Error for Test4:", error);
  }

  try {
    await authors.getBookNames("Perrine", "Greenough"); 
    console.log("Test5: No error");
  } catch (error) {
    console.error("Error for Test5:", error);
  }

  try {
    await authors.getBookNames(); 
    console.log("Test6: No error");
  } catch (error) {
    console.error("Error for Test6:", error);
  }
};

testGetBookNames();


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
    await authors.sameBirthday(9, 31);
  } catch (error) {
    console.error(error);
  }

  try {
    await authors.sameBirthday(13, 25); 
  } catch (error) {
    console.error(error);
  }

  try {
    await authors.sameBirthday(2, 30); 
  } catch (error) {
    console.error(error);
  }

  try {
    await authors.sameBirthday("09", "31"); 
  } catch (error) {
    console.error(error);
  }

  try {
    await authors.sameBirthday();
  } catch (error) {
    console.error(error);
  }
}

runTests(); */

/*********************** BOOKS ***********************/

import { getBookById } from "./books.js";

async function runTests() {
  try {
    const book = await getBookById("99875ad8-a1d3-42ea-8d7b-5ac4cd4edb9e");
    console.log(book);
  } catch (error) {
    console.error(error);
  }

  try {
    await getBookById(-1);
  } catch (error) {
    console.error(error);
  }

  try {
    await getBookById(1001);
  } catch (error) {
    console.error(error);
  }

  try {
    await getBookById();
  } catch (error) {
    console.error(error);
  }

  try {
    await getBookById("7989fa5e-5617-43f7-a931-46036f9dbcff"); // Throws 'Book not found' Error
  } catch (error) {
    console.error(error);
  }
}

runTests();

import { getAuthorName } from "./books.js";

try {
  const authorName = await getAuthorName(
    "99875ad8-a1d3-42ea-8d7b-5ac4cd4edb9e"
  );
  console.log(authorName);
} catch (error) {
  console.error(error);
}

try {
  await getAuthorName(-1);
} catch (error) {
  console.error(error);
}

try {
  await getAuthorName(1001);
} catch (error) {
  console.error(error);
}

try {
  await getAuthorName();
} catch (error) {
  console.error(error);
}

try {
  await getAuthorName("7989fa5e-5617-43f7-a931-46036f9dbcff"); // Throws 'Book not found' Error
} catch (error) {
  console.error(error);
}

import { sameGenre } from "./books.js";
try {
  await sameGenre("Memoir");
} catch (error) {
  console.error(error);
}

try {
  await sameGenre(-1);
} catch (error) {
  console.error(error);
}

try {
  await sameGenre(1001);
} catch (error) {
  console.error(error);
}

try {
  await sameGenre();
} catch (error) {
  console.error(error);
}

try {
  await sameGenre(false);
} catch (error) {
  console.error(error);
}

try {
  await sameGenre("foo bar");
} catch (error) {
  console.error(error);
}

import { priceRange } from "./books.js";

(async () => {
  try {
    const booksInRange1 = await priceRange(5.99, 30);
    console.log("Books within the price range:", booksInRange1);
  } catch (error) {
    console.error("Error:", error);
  }

  try {
    const booksInRange2 = await priceRange("foo", 12);
    console.log("Books within the price range:", booksInRange2);
  } catch (error) {
    console.error("Error:", error);
  }

  try {
    const booksInRange3 = await priceRange(5, 3);
    console.log("Books within the price range:", booksInRange3);
  } catch (error) {
    console.error("Error:", error);
  }

  try {
    const booksInRange4 = await priceRange(-5, 3);
    console.log("Books within the price range:", booksInRange4);
  } catch (error) {
    console.error("Error:", error);
  }

  try {
    const booksInRange5 = await priceRange(); // Missing parameters
    console.log("Books within the price range:", booksInRange5);
  } catch (error) {
    console.error("Error:", error);
  }
})();

import { getAllBooksWithAuthorName } from "./books.js";

(async () => {
  try {
    const booksWithAuthors = await getAllBooksWithAuthorName();

    console.log(booksWithAuthors);
  } catch (error) {
    console.error("Error:", error.message);
  }
})();
