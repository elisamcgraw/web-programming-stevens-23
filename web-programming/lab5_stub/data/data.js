/*Here, you can export the functions you did for lab 3
to get the authors, books, getBookByID, getAuthorById.  You will import these functions into your routing files and call the relevant function depending on the route. 


*/
import axios from 'axios';

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

const getBookById = async (id) => {
  // Validate the id parameter
  checkValidString(id, "id");

  // Fetch books' data
  const books = await getBooks();

  // Find the book with the specified id
  const book = books.find((book) => book.id === id);

  // Throw an error if the book is not found
  if (!book) {
    throw "Book not found";
  }

  return book;
};

const getAuthorById = async (id) => {
  checkValidString(id); // check valid id
  const authors = await getAuthors(); // fetch authors from link
  const author = authors.find((author) => author.id === id);
  if (!author) {
    throw "Author not found";
  }

  return author;
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


export {getBooks, getAuthors, getAuthorById, getBookById, checkValidString}
