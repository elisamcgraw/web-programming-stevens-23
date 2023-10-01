/* TODO: Import the functions from your three modules here and write two test cases for each function.. You should have a total of 18 test cases. 
do not forget that you need to create the package.json and add the start command to run app.js as the starting script*/

import {
  mergeCommonElements,
  findTriangles,
  stringMetrics,
} from "./arrayUtils.js";
import { emojiCounter, sortStockPrices, mashUp } from "./stringUtils.js";
import { solvePuzzles, evaluatePokerHand, combineObjects } from "./objUtils.js";

/****************************** Test Cases for mergeCommonElements *******************************/

// Test Case 1: Should Pass
try {
  const merged1 = mergeCommonElements([2, 3, 4], [3, 4, 5], [4, 5, 6]);
  console.log("mergeCommonElements Test Case 1 passed successfully");
} catch (e) {
  console.error("mergeCommonElements Test Case 1 failed");
}

// Test Case 2: Should Fail
try {
  const merged2 = mergeCommonElements([2, 3, 4], [3, 4, 5], 123);
  console.error("mergeCommonElements Test Case 2 did not error");
} catch (e) {
  console.log("mergeCommonElements Test Case 2 failed successfully");
}

/****************************** Test Cases for findTriangles *******************************/

// Test Case 3: Should Pass
try {
  const triangles1 = findTriangles([
    [3, 4, 5],
    [5, 12, 13],
    [8, 15, 17],
  ]);
  console.log("findTriangles Test Case 3 passed successfully");
} catch (e) {
  console.error("findTriangles Test Case 3 failed");
}

// Test Case 4: Should Fail
try {
  const triangles2 = findTriangles([
    [3, 4, "5"],
    [5, 12, 13],
    [8, 15, 17],
  ]);
  console.error("findTriangles Test Case 4 did not error");
} catch (e) {
  console.log("findTriangles Test Case 4 failed successfully");
}

/****************************** Test Cases for stringMetrics *******************************/

// Test Case 5: Should Pass
try {
  const metrics1 = stringMetrics(["apple", "banana", "cherry", "date"]);
  console.log("stringMetrics Test Case 5 passed successfully");
} catch (e) {
  console.error("stringMetrics Test Case 5 failed");
}

// Test Case 6: Should Fail
try {
  const metrics2 = stringMetrics(["apple", "banana", null, "date"]);
  console.error("stringMetrics Test Case 6 did not error");
} catch (e) {
  console.log("stringMetrics Test Case 6 failed successfully");
}

/****************************** Test Cases for emojiCounter *******************************/
/****************************** Test Cases for emojiCounter *******************************/

// Test Case 7: Should Pass
try {
  const emojiCount1 = emojiCounter("Hello :smile: and :wave:");
  console.log("emojiCounter Test Case 7 passed successfully");
} catch (e) {
  console.error("emojiCounter Test Case 7 failed");
}

// Test Case 8: Should Fail
try {
  const emojiCount2 = emojiCounter("No emojis here");
  console.error("emojiCounter Test Case 8 did not error");
} catch (e) {
  console.log("emojiCounter Test Case 8 failed successfully");
}

/****************************** Test Cases for sortStockPrices *******************************/

// Test Case 9: Should Pass
try {
  const sortedStocks1 = sortStockPrices(
    "AAPL,150.25|GOOGL,2730.50|TSLA,750.60",
    "AAPL,155.75|GOOGL,2750.80|TSLA,755.20"
  );
  console.log("sortStockPrices Test Case 9 passed successfully");
} catch (e) {
  console.error("sortStockPrices Test Case 9 failed");
}

// Test Case 10: Should Fail
try {
  const sortedStocks2 = sortStockPrices(
    "AAPL,150.25|GOOGL,2730.50|TSLA,750.60",
    "AAPL,155.75|GOOGL,2750.80|AMZN,3350.00"
  );
  console.error("sortStockPrices Test Case 10 did not error");
} catch (e) {
  console.log("sortStockPrices Test Case 10 failed successfully");
}

/****************************** Test Cases for mashUp *******************************/

// Test Case 11: Should Pass
try {
  const mashedUpString1 = mashUp("apple", "banana");
  console.log("mashUp Test Case 11 passed successfully");
} catch (e) {
  console.error("mashUp Test Case 11 failed");
}

// Test Case 12: Should Fail
try {
  const mashedUpString2 = mashUp("apple", " ba nana");
  console.error("mashUp Test Case 12 did not error");
} catch (e) {
  console.log("mashUp Test Case 12 failed successfully");
}

/****************************** Test Cases for solvePuzzles *******************************/

// Test Case 13: Should Pass
try {
  const puzzles = [
    { a: "red", b: undefined, c: "green" },
    { a: "blue", b: "yellow", c: undefined },
    { a: undefined, b: "orange", c: "purple" },
  ];
  const pieces = { a: "pink", b: "cyan", c: "magenta" };
  const completedPuzzles = solvePuzzles(puzzles, pieces);
  console.log("solvePuzzles Test Case 13 passed successfully");
} catch (e) {
  console.error("solvePuzzles Test Case 13 failed");
}

// Test Case 14: Should Fail
try {
  const puzzles = [
    { a: "red", b: undefined, c: "green" },
    { a: "blue", b: "yellow", c: undefined },
    { a: undefined, b: "orange", c: "purple" },
  ];
  const pieces = { a: "pink", b: "cyan" }; // Missing a piece
  const completedPuzzles = solvePuzzles(puzzles, pieces);
  console.error("solvePuzzles Test Case 14 did not error");
} catch (e) {
  console.log("solvePuzzles Test Case 14 failed successfully");
}

/****************************** Test Cases for evaluatePokerHand *******************************/

// Test Case 15: Should Pass
try {
  const hand = [
    { suit: "hearts", value: "A" },
    { suit: "hearts", value: "K" },
  ];
  const communityCards = [
    { suit: "hearts", value: "Q" },
    { suit: "hearts", value: "J" },
    { suit: "spades", value: "10" },
  ];
  const result = evaluatePokerHand(hand, communityCards);
  console.log("evaluatePokerHand Test Case 15 passed successfully");
} catch (e) {
  console.error("evaluatePokerHand Test Case 15 failed");
}

// Test Case 16: Should Fail
try {
  const hand = [
    { suit: "hearts", value: "A" },
    { suit: "hearts", value: "K" },
  ];
  const communityCards = [{ suit: "hearts", value: "Q" }]; // Community cards are insufficient
  const result = evaluatePokerHand(hand, communityCards);
  console.error("evaluatePokerHand Test Case 16 did not error");
} catch (e) {
  console.log("evaluatePokerHand Test Case 16 failed successfully");
}

/****************************** Test Cases for combineObjects *******************************/

// Test Case 17: Should Pass
try {
  const objects = [
    { a: 1, b: 2, c: 3 },
    { b: 2, c: 3, d: 4 },
    { c: 3, d: 4, e: 5 },
  ];
  const combined = combineObjects(objects);
  console.log("combineObjects Test Case 17 passed successfully");
} catch (e) {
  console.error("combineObjects Test Case 17 failed");
}

// Test Case 18: Should Fail
try {
  const objects = [
    { a: 1, b: 2, c: 3 },
    { b: 2, c: 3, x: 4 }, // Invalid key "x"
    { c: 3, d: 4, e: 5 },
  ];
  const combined = combineObjects(objects);
  console.error("combineObjects Test Case 18 did not error");
} catch (e) {
  console.log("combineObjects Test Case 18 failed successfully");
}
