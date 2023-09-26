/* Todo: Implment the functions below and then export them
      using the ES6 exports syntax. 
      DO NOT CHANGE THE FUNCTION NAMES
*/
// Function to check if the input exists and is of the proper type (string)
const checkInputType = (message) => {
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

let sortStockPrices = (lastStocks, currStocks) => {};

let mashUp = (string1, string2) => {};

export { emojiCounter };
