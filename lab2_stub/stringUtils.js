/* Todo: Implment the functions below and then export them
      using the ES6 exports syntax. 
      DO NOT CHANGE THE FUNCTION NAMES
*/

/******************** Error Check **********************/
// Check if the input exists and is of the proper type (string)
const checkIfString = (message) => {
  if (typeof message !== "string") {
    throw new Error("Input must be a string.");
  }
};

// Function to remove spaces and check if the input is empty
const checkEmptyInput = (message) => {
  if (message.trim().length === 0) {
    throw new Error("Input string cannot be empty or contain only spaces.");
  }
};

// Check the length of each string is at least 4 characters.
const checkStringLength = (string, minLength) => {
  if (string.length < minLength) {
    throw new Error(`String must have at least ${minLength} characters`);
  }
};

function checkValidStockFormat(stockPair) {
  const [ticker, price] = stockPair.trim().split(",");
  if (!/^[a-zA-Z]{1,5}$/.test(ticker)) {
    throw new Error("Invalid stock ticker format");
  }
  if (!/^\d+(\.\d+)?$/.test(price)) {
    throw new Error("Invalid stock price format");
  }
}

function checkSameStocks(lastStockKeys, currStockKeys) {
  if (
    !lastStockKeys.every((ticker) => currStockKeys.includes(ticker)) ||
    !currStockKeys.every((ticker) => lastStockKeys.includes(ticker))
  ) {
    throw new Error(
      "Both strings must contain the same stocks (case-insensitive)"
    );
  }
}

/******************** Lab Functions **********************/
let emojiCounter = (message) => {
  // Error check: Check if the input exists and is of the proper type (string)
  checkInputType(message);

  // Error check: Remove spaces and check if the input is empty
  checkEmptyInput(message);

  // Regular expression to match valid emojis enclosed within colons
  const emojiRegex = /:[^:\s]+:/g;

  // Find all valid emojis in the message
  const emojis = message.match(emojiRegex) || [];

  // Return the number of valid emojis found
  return emojis.length;
};

let sortStockPrices = function (lastStocks, currStocks) {
  // Check if both arguments are strings
  checkIfString(lastStocks);
  checkIfString(currStocks);

  // Split the CSV strings into arrays of stock-price pairs
  const lastStockPairs = lastStocks.split("|");
  const currStockPairs = currStocks.split("|");

  // Check if both arrays have the same length
  if (lastStockPairs.length !== currStockPairs.length) {
    throw new Error("Both strings must contain the same number of stocks");
  }

  // Create objects for stocks and their prices from both strings
  const lastStockData = {};
  const currStockData = {};

  for (const pair of lastStockPairs) {
    checkValidStockFormat(pair);
    lastStockData[pair.split(",")[0].toLowerCase()] = parseFloat(
      pair.split(",")[1]
    );
  }

  for (const pair of currStockPairs) {
    checkValidStockFormat(pair);
    currStockData[pair.split(",")[0].toLowerCase()] = parseFloat(
      pair.split(",")[1]
    );
  }

  // Check if both sets of stock data have the same keys (case-insensitive)
  const lastStockKeys = Object.keys(lastStockData);
  const currStockKeys = Object.keys(currStockData);

  checkSameStocks(lastStockKeys, currStockKeys);

  // Calculate the percentage change and create an array of stock objects
  const stockObjects = lastStockKeys.map((ticker) => {
    const lastPrice = lastStockData[ticker];
    const currPrice = currStockData[ticker];
    const change = ((currPrice - lastPrice) / lastPrice) * 100;
    return {
      symbol: ticker.toUpperCase(),
      price: currPrice.toFixed(2),
      change: change.toFixed(1),
    };
  });

  // Sort the array by percentage change
  stockObjects.sort((a, b) => b.change - a.change);

  return stockObjects;
};

let mashUp = (string1, string2) => {
  // Check if both strings exist and are of the proper type
  checkIfString(string1);
  checkIfString(string2);

  // Check if the length of each string is at least 4 characters
  checkStringLength(string1, 4);
  checkStringLength(string2, 4);

  // Check if both strings are not just strings with empty spaces
  checkEmptyInput(string1);
  checkEmptyInput(string2);

  // Swap the first 4 characters of each string and concatenate them with a space
  const swappedString1 = string2.substring(0, 4) + string1.substring(4);
  const swappedString2 = string1.substring(0, 4) + string2.substring(4);

  return swappedString1 + " " + swappedString2;
};

export { emojiCounter, sortStockPrices, mashUp };
