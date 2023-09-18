import * as lab1 from './lab1.mjs';


//TODO: Write and call each function in lab1.js 5 times each, passing in different input

/** Question 1 */
console.log(lab1.questionOne(["Hello", "good", "weather", "today"])); // [9, false]
console.log(lab1.questionOne(["I", "enjoy", "coding", "in", "JavaScript", "yay!"])); // [10, false]
console.log(lab1.questionOne(["Ths s nrdbl", "grd"])); // [0, true] (no vowels)
console.log(lab1.questionOne(["Programming", "is", "fun"])); // [5, false]
console.log(lab1.questionOne(["AEIOU", "aeiou", "Yy"])); // [10, true]

/** Question 2 */
console.log(lab1.questionTwo({ a: 1, b: 2, c: 3 }, { c: 3, d: 4, e: 5 })); // ["a", "b", "d", "e"]
console.log(lab1.questionTwo({ x: "apple", y: "banana", z: "cherry" }, { a: "apple", b: "banana", c: "cherry" })); // ["a", "b", "c", "x", "y", "z"]
console.log(lab1.questionTwo({ 1: "one", 2: "two", 3: "three" }, { 3: "three", 4: "four", 5: "five" })); // ["1", "2", "4", "5"]
console.log(lab1.questionTwo({ a: 1, b: 2, c: 3 }, { a: 1, b: 2, c: 3 })); // []
console.log(lab1.questionTwo({}, { a: 1, b: 2, c: 3 })); // ["a", "b", "c"]

/** Question 3 */
console.log(lab1.questionThree([[3, 4, 5], [6, 8, 10], [5, 12, 13]])); // Returns {'0': [6, 12], '1': [24, 24], '2': [30, 30]}
console.log(lab1.questionThree([[1, 1, 1], [5, 5, 5], [8, 15, 17]])); // Returns {'0': [0.43, 3], '1': [10.83, 15], '2': [60, 40]}
console.log(lab1.questionThree([[7, 24, 25], [9, 40, 41], [11, 60, 61]])); // Returns {'0': [84, 56], '1': [180, 90], '2': [330, 132]}
console.log(lab1.questionThree([[8, 15, 17], [12, 16, 20], [9, 40, 41]])); // Returns {'0': [60, 40], '1': [95.28, 48], '2': [180, 90]}
console.log(lab1.questionThree([[1, 2, 2], [3, 4, 5], [6, 8, 10]])); // Returns {'0': [0.97, 5], '1': [6, 12], '2': [24, 24]}


