//TODO EXPORT AND IMPLEMENT THE FOLLOWING FUNCTIONS IN ES6 FORMAT
//Books data link: https://gist.githubusercontent.com/graffixnyc/3381b3ba73c249bfcab1e44d836acb48/raw/e14678cd750a4c4a93614a33a840607dd83fdacc/books.json

import axios from "axios";
import { getAuthors, getBooks, checkValidString } from "./authors.js";

// Function to check if a value is a valid number
const isValidNumber = (value) => typeof value === "number" && !isNaN(value);

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

const getAuthorName = async (bookId) => {
  // Error check for id
  checkValidString(bookId);

  // Fetch the list of books
  const books = await getBooks();

  // Find the book with the provided bookId
  const book = books.find((book) => book.id === bookId);

  if (!book) {
    throw "Book not found";
  }

  // Fetch the list of authors
  const authors = await getAuthors(); // You should have a function for fetching authors

  // Find the author with the same id as the book's authorId
  const author = authors.find((author) => author.id === book.authorId);

  if (!author) {
    throw "Author not found for the book";
  }

  // Concatenate the author's first and last name
  const authorName = `${author.first_name} ${author.last_name}`;

  return authorName;
};

const sameGenre = async (genre) => {
  // Validate the genre parameter
  checkValidString(genre, "genre");

  // Fetch the list of books
  const books = await getBooks();

  // Convert the genre to lowercase for case-insensitive matching
  const lowercaseGenre = genre.trim().toLowerCase();

  // Filter the books that have the specified genre
  const matchingBooks = books.filter((book) =>
    book.genres.some((bookGenre) => bookGenre.toLowerCase() === lowercaseGenre)
  );

  // Throw an error if no matching books are found
  if (matchingBooks.length === 0) {
    throw `No books found with the genre '${genre}'`;
  }

  return matchingBooks;
};

const priceRange = async (min, max) => {
  // Check if min and max are valid numbers
  if (!isValidNumber(min) || !isValidNumber(max)) {
    throw "Both min and max must be valid numbers";
  }

  // Check if min is less than max
  if (min >= max) {
    throw "min must be less than max";
  }
  const books = await getBooks();

  // Filter the books within the price range
  const booksInRange = books.filter(
    (book) => book.price >= min && book.price <= max
  );

  // If no books are found in the range, return an empty array
  return booksInRange;
};

const getAllBooksWithAuthorName = async () => {
  // Fetch books' data and authors' data
  const [books, authors] = await Promise.all([getBooks(), getAuthors()]);

  // Map each book and replace authorId with the author's full name
  const booksWithAuthorNames = books.map((book) => {
    const author = authors.find((author) => author.id === book.authorId);
    if (!author) {
      throw new Error(`Author not found for book with ID ${book.id}`);
    }
    return {
      ...book,
      author: `${author.first_name} ${author.last_name}`,
    };
  });

  return booksWithAuthorNames;
};

export {
  getBookById,
  getAuthorName,
  sameGenre,
  priceRange,
  getAllBooksWithAuthorName,
};
