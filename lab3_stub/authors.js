//TODO EXPORT AND IMPLEMENT THE FOLLOWING FUNCTIONS IN ES6 FORMAT
//Authors data link: https://gist.githubusercontent.com/graffixnyc/a086a55e04f25e538b5d52a095fe4467/raw/e9f835e9a5439a647a24fa272fcb8f5a2b94dece/authors.json

//you must use axios to get the data
import axios from "axios";

const getAuthors = async () => {
  try {
    const { data } = await axios.get(
      "https://gist.githubusercontent.com/graffixnyc/a086a55e04f25e538b5d52a095fe4467/raw/e9f835e9a5439a647a24fa272fcb8f5a2b94dece/authors.json"
    );
    return data;
  } catch (error) {
    if (error.response) {
      // Handle HTTP errors (e.g., 404, 500)
      throw `HTTP Error: ${error.response.status}`;
    } else if (error.request) {
      // Handle network errors (e.g., no internet connection)
      throw `Network Error: ${error.message}`;
    } else {
      // Handle other errors, including JSON parsing errors
      throw `Error: ${error.message}`;
    }
  }
};

const getBooks = async () => {
  try {
    const { data } = await axios.get(
      "https://gist.githubusercontent.com/graffixnyc/3381b3ba73c249bfcab1e44d836acb48/raw/e14678cd750a4c4a93614a33a840607dd83fdacc/books.json"
    );
    return data;
  } catch (error) {
    if (error.response) {
      // Handle HTTP errors (e.g., 404, 500)
      throw `HTTP Error: ${error.response.status}`;
    } else if (error.request) {
      // Handle network errors (e.g., no internet connection)
      throw `Network Error: ${error.message}`;
    } else {
      // Handle other errors, including JSON parsing errors
      throw `Error: ${error.message}`;
    }
  }
};
/************************* Error Checking *************************/

const checkValidString = (input) => {
  // Error checking for id parameter
  if (typeof input !== "string") {
    throw "Invalid argument: id must be a string";
  }

  // Error checking for empty id
  if (input.trim() === "") {
    throw "Invalid argument: id cannot be empty";
  }

  return input;
};

const checkAuthorsFoundId = (matchingAuthors) => {
  if (matchingAuthors.length === 0) {
    throw "No authors found for the provided searchTerm";
  }
};

/************************* Lab Functions *************************/
const getAuthorById = async (id) => {
  checkValidString(id); // check valid id
  const authors = await getAuthors(); // fetch authors from link
  const author = authors.find((author) => author.id === id);
  if (!author) {
    throw "Author not found";
  }

  return author;
};

const searchAuthorByName = async (searchTerm) => {
  searchTerm = checkValidString(searchTerm);

  const authors = await getAuthors();

  const matchingAuthors = authors.filter((author) => {
    const fullName = `${author.first_name} ${author.last_name}`.toLowerCase();
    return fullName.includes(searchTerm);
  });

  checkAuthorsFoundId(matchingAuthors);

  matchingAuthors.sort((a, b) => {
    return a.last_name.localeCompare(b.last_name);
  });

  const result = matchingAuthors.map((author) => {
    return `${author.first_name} ${author.last_name}`;
  });

  return result;
};

const getBookNames = async (firstName, lastName) => {
  // Error checking for firstName and lastName
  firstName = checkValidString(firstName, "firstName");
  lastName = checkValidString(lastName, "lastName");

  // Fetch authors and books data
  const authors = await getAuthors();
  const books = await getBooks();

  // Find the author whose first and last name matches (case-insensitive)
  const matchingAuthor = authors.find(
    (author) =>
      author.first_name.toLowerCase() === firstName.toLowerCase() &&
      author.last_name.toLowerCase() === lastName.toLowerCase()
  );

  if (!matchingAuthor) {
    throw `Author ${firstName} ${lastName} not found in authors.json`;
  }

  // Get book titles from the author's books array
  const bookTitles = matchingAuthor.books
    .map((bookId) => {
      const book = books.find((b) => b.id === bookId);
      return book ? book.title : null;
    })
    .filter((title) => title !== null);

  // Sort book titles alphabetically
  bookTitles.sort();

  if (bookTitles.length === 0) {
    throw `Author ${firstName} ${lastName} has not written any books`;
  }

  return bookTitles;
};

const youngestOldest = async () => {
    // Fetch authors' data
    const authors = await getAuthors();
  
    // Check if authors array is empty
    if (authors.length === 0) {
      return { youngest: '', oldest: '' };
    }
  
    // Parse birthdates and calculate youngest and oldest authors
    authors.forEach((author) => {
      const [month, day, year] = author.date_of_birth.split('/').map(Number);
      author.birthdate = new Date(year, month - 1, day); // Months are 0-based in JavaScript
    });
  
    // Sort authors by birthdate (from oldest to youngest)
    authors.sort((a, b) => b.birthdate - a.birthdate); // Reversed order
  
    // Calculate youngest and oldest authors
    const youngestAuthor = authors[0];
    const oldestAuthor = authors[authors.length - 1];
  
    // Handle ties for youngest and oldest authors
    const youngestAuthors = [];
    const oldestAuthors = [];
  
    for (const author of authors) {
      if (author.birthdate.getTime() === youngestAuthor.birthdate.getTime()) {
        youngestAuthors.push(`${author.first_name} ${author.last_name}`);
      }
      if (author.birthdate.getTime() === oldestAuthor.birthdate.getTime()) {
        oldestAuthors.push(`${author.first_name} ${author.last_name}`);
      }
    }
  
    // Sort the tied authors by last name
    youngestAuthors.sort();
    oldestAuthors.sort();
  
    // Prepare the result
    const result = {
      youngest: youngestAuthors.length === 1 ? youngestAuthors[0] : youngestAuthors,
      oldest: oldestAuthors.length === 1 ? oldestAuthors[0] : oldestAuthors,
    };
  
    return result;
  };
  
  
  const validateMonthAndDay = (month, day) => {
    // Check if month and day are valid numbers
    if (typeof month !== 'number' || typeof day !== 'number') {
      throw 'Invalid arguments: month and day must be numbers';
    }
  
    // Check if month is in the range 1-12
    if (month < 1 || month > 12) {
      throw 'Invalid argument: month must be in the range 1-12';
    }
  
    // Check if day is valid for the given month
    const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (day < 1 || day > daysInMonth[month - 1]) {
      throw `Invalid argument: day is not valid for month ${month}`;
    }
  };
  
  const sameBirthday = async (month, day) => {
    // Validate month and day
    validateMonthAndDay(month, day);
  
    // Fetch authors' data
    const authors = await getAuthors();
  
    // Filter authors with the same birthday
    const matchingAuthors = authors.filter((author) => {
      const [authorMonth, authorDay] = author.date_of_birth.split('/').map(Number);
      return authorMonth === month && authorDay === day;
    });
  
    // Sort matching authors by last name
    matchingAuthors.sort((a, b) => a.last_name.localeCompare(b.last_name));
  
    // Create an array of full names
    const result = matchingAuthors.map((author) => `${author.first_name} ${author.last_name}`);
  
    // Throw an error if no authors have the same birthday
    if (result.length === 0) {
      throw 'No authors found with the same birthday';
    }
  
    return result;
  };
  

export {
  getAuthorById,
  searchAuthorByName,
  getBookNames,
  youngestOldest,
  sameBirthday,
};
