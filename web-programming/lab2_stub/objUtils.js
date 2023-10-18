/* Todo: Implment the functions below and then export them
      using the ES6 exports syntax. 
      DO NOT CHANGE THE FUNCTION NAMES
*/

/****************************** Error Checks *******************************/

// Function to check if the argument is an array
function isArray(input) {
  return Array.isArray(input);
}

// Function to check if there are at least two objects in the array
function hasAtLeastTwoObjects(arr) {
  return arr.length >= 2;
}

// Function to check if each object has at least one key
function eachObjectHasAtLeastOneKey(arr) {
  return arr.every((obj) => Object.keys(obj).length > 0);
}

// Error checking function for objects
function validateObject(obj, paramName, requiredKeys = []) {
  if (typeof obj !== "object") {
    throw new Error(`${paramName} must be an object.`);
  }

  if (requiredKeys.length > 0) {
    const missingKeys = requiredKeys.filter((key) => !obj.hasOwnProperty(key));
    if (missingKeys.length > 0) {
      throw new Error(
        `${paramName} is missing required key(s): ${missingKeys.join(", ")}`
      );
    }
  }
}

// Function to validate key
function keyCheck(puzzles) {
  if (!Array.isArray(puzzles) || puzzles.length === 0) {
    throw new Error("Puzzles must be a non-empty array of objects.");
  }

  puzzles.forEach((puzzle, index) => {
    validateObject(puzzle, `Puzzle at index ${index}`, [
      "a",
      "b",
      "c",
      "d",
      "e",
    ]);
  });
}

// Function to validate pieces
function validatePieces(pieces) {
  validateObject(pieces, "Pieces", ["a", "b", "c", "d", "e"]);
}

// Function to solve puzzles
let solvePuzzles = (puzzles, pieces) => {
  // Validate input
  keyCheck(puzzles);
  validatePieces(pieces);

  // Function to complete a puzzle
  const completePuzzle = (puzzle, pieces) => {
    const completedPuzzle = { ...puzzle };

    for (const key in completedPuzzle) {
      if (completedPuzzle[key] === undefined) {
        completedPuzzle[key] = pieces[key];
      }
    }

    return completedPuzzle;
  };

  // Complete each puzzle and store the results in an array
  const completedPuzzles = puzzles.map((puzzle) =>
    completePuzzle(puzzle, pieces)
  );

  return completedPuzzles;
};

/*********************** evaluatePokerHand *************************/
let evaluatePokerHand = (hand, communityCards) => {
  // Check if the input arrays are valid
  if (
    !Array.isArray(hand) ||
    hand.length !== 2 ||
    !Array.isArray(communityCards) ||
    communityCards.length < 3 ||
    communityCards.length > 5
  ) {
    throw new Error(
      "Invalid input. Please provide a valid hand and community cards."
    );
  }

  // Define a function to count the occurrences of each card value
  function countCardValues(cards) {
    const valueCount = {};
    for (const card of cards) {
      const cardValue = card.value;
      valueCount[cardValue] = (valueCount[cardValue] || 0) + 1;
    }
    return valueCount;
  }

  // Combine hand and community cards to evaluate the best hand
  const allCards = [...hand, ...communityCards];

  // Count the occurrences of each card value
  const valueCount = countCardValues(allCards);

  // Check for a Straight Flush
  for (const suit of ["hearts", "clubs", "diamonds", "spades"]) {
    const straightFlushValues = [
      "A",
      "K",
      "Q",
      "J",
      "10",
      "9",
      "8",
      "7",
      "6",
      "5",
      "4",
      "3",
      "2",
    ];
    let consecutiveCount = 0;
    for (const value of straightFlushValues) {
      if (
        valueCount[value] &&
        valueCount[value] > 0 &&
        allCards.some((card) => card.suit === suit && card.value === value)
      ) {
        consecutiveCount++;
        if (consecutiveCount === 5) {
          return "Straight Flush";
        }
      } else {
        consecutiveCount = 0;
      }
    }
  }

  // Check for Three of a Kind and Pair
  let hasThreeOfAKind = false;
  let hasPair = false;
  for (const value in valueCount) {
    if (valueCount[value] === 3) {
      hasThreeOfAKind = true;
    } else if (valueCount[value] === 2) {
      hasPair = true;
    }
  }

  if (hasThreeOfAKind && hasPair) {
    return "Full House";
  } else if (hasThreeOfAKind) {
    return "Three of a Kind";
  } else if (hasPair) {
    return "Pair";
  }

  // If no special hand is found, return "High Card"
  return "High Card";
};

/*********************** combineObjects *************************/
// Function to combine objects as described
let combineObjects = (arr) => {
  // Check if the argument is an array
  if (!isArray(arr)) {
    throw new Error("Input must be an array.");
  }

  // Check if there are at least two objects in the array
  if (!hasAtLeastTwoObjects(arr)) {
    throw new Error("Array must contain at least two objects.");
  }

  // Check if each object has at least one key
  if (!eachObjectHasAtLeastOneKey(arr)) {
    throw new Error("Each object must have at least one key.");
  }

  // Initialize an object to store common keys and their values
  const commonKeys = {};

  // Iterate through the keys of the first object to find common keys
  const firstObjectKeys = Object.keys(arr[0]);

  for (const key of firstObjectKeys) {
    // Check if the key exists in all objects
    if (arr.every((obj) => obj.hasOwnProperty(key))) {
      // Map the values of this key from all objects
      commonKeys[key] = arr.map((obj) => obj[key]);
    }
  }

  return commonKeys;
};

export { solvePuzzles, evaluatePokerHand, combineObjects };
