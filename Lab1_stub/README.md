CS-546 Lab 1
An Intro to Node
For this lab, you will be creating and running several functions to practice JavaScript syntax.

For this lab, you will make two files: lab1.mjs and lab1.test.mjs and submit them in a zip file that's named LastName_FirstName.zip. For example: Hill_Patrick.zip

You should not have any folders inside the zip file.

You must submit your files with the format specified, named as specified.

You do not have to take input validation and error handling into account for lab 1. You can assume that we will be testing with only valid data. We will begin input validation and error handling in lecture/lab 2. 

You can download the lab code starting template here that has the correct file and function names: Lab1_stub.zipDownload Lab1_stub.zip

Reminder:  Your functions MUST have a return value(using the return statement).  Do not just console.log the result in the function.  A function that does not have a return value , returns undefined and if your function returns undefined, you will get the FULL points off for the function. If you want to log the return value, you wrap the call to the function in a console.log.

lab1.mjs
In this file, you will update the content of the functions and update the firstName, lastName, and studentId with the appropriate information. The function specifications are listed in the section below.

export const questionOne = (arr) => {
    // Implement question 1 here
   return //return result
} 

export const questionTwo = (obj1, obj2) => { 
    // Implement question 2 here

    return //return result 
} 

export const questionThree = (arr) => { 
    // Implement question 3 here
    return //return result 
} 

export const questionFour = (string) => { 
    // Implement question 4 here
    return //return result 
} 

export const studentInfo= { 
    firstName: "YOUR FIRST NAME", 
    lastName: "YOUR LAST NAME", 
    studentId: "YOUR STUDENT ID", 
  
}; 
lab1.test.mjs
In this file, you will import your functions from lab1.mjs and call EACH function 5 times, passing in different input each time to ensure your function is working properly.

import * as lab1 from "./lab1.mjs"; 


// make 5 calls to questionOne passing in different inputs
console.log(lab1.questionOne(["Hello", "good", "weather", "today"])) // returns and then outputs: [9, false]

// make 5 calls to questionTwo passing in different inputs
console.log(lab1.questionTwo({ a: 3, b: 2, c: 1, d: 7 }, { a: 6, b: 5, c: 4, e: 8 })); // Returns and then outputs: ["d","e"]

// make 5 calls to questionThree
console.log(lab1.questionThree([[3,3,3], [3,3,4], [5,4,2]])); // returns and then outputs: {'0': [3.9,9], '1': [4.47,10], '2': [3.8,11]} 

// make 5 calls to questionFour
console.log(lab1.questionFour('patrick,hill,trees,home'));  // Returns and then outputs: ['rickpat', 'llhi', 'eestr', 'meho'] 
Functions to implement
questionOne(arr)
For your first function, you will calculate the amount of vowels (A, E, I, O, U, not Y) in each string in the supplied array and return the sum of all the amounts. Additionally, a boolean should be returned indicating whether the total sum was even. To return both outputs, use an array. The order of elements matters. See the following examples: 

lab1.questionOne(["Hello", "good", "weather", "today"]) // returns [9, false] 

lab1.questionOne(["I", "love", "CS 546.", "Best class ever."]) // returns [7, false] 

lab1.questionOne(["Ths s nrdbl", "grd"]) // returns [0, true] 
questionTwo(obj1, obj2);

For your 2nd function, you will take in two objects and return an array containing all the keys they don't have in common. More specifically, every key that occurs in one object but not the other should be in the returned array; any key in both, even if the values are different, should be discarded. The returned array should be stably sorted by the keys numerically first (if the key is a string representation of a number,  as all keys in an object are strings) and then alphabetically. 

lab1.questionTwo({ a: 3, b: 2, c: 1, d: 7 }, { a: 6, b: 5, c: 4, e: 8 }) // returns ["d","e"] 
lab1.questionTwo({ a: 3, b: 2, f: 1, g: 46 }, { d: 3, e: 4, c: 5, g: 2 }) // returns ["a","b","c","d","e","f"]
lab1.questionTwo( {'1': true, a: 5, '2': 'hi'}, {'3': true, b: 5, '44': "hi", '4': "bye", '5': 8}) // returns ['1', '2', '3', '4', '5', '44', 'a', 'b'] 
questionThree(array)

For your third function, you will take in an array of arrays (a 2d array). Each array will contain 3 numbers, which represent the 3 sides of a triangle. You will return an object that has the area and perimeter of each triangle. Round the area to the nearest 2 decimal places. 
 
The keys of the object will correspond to the index of each triangle in the original array. The value of each key will be an array containing the area and perimeter, in that order. For example -> [area, perimeter]. 

 lab1.questionThree([[3,3,3], [3,3,4], [5,4,2]])   // returns {'0': [3.9,9], '1': [4.47,10], '2': [3.8,11]} 

 lab1.questionThree([[7,5,5], [2,4,3], [8,5,6], [12,12,11]])   // returns {'0': [12.5, 17], '1': [2.9,9], '2': [14.98,19], '3': [58.66,35]} 
questionFour(string)
For the fourth function, you will take each word from a comma-separated value (CSV), cut it in half, and put the second half in front of the first half. For example, "tree" -> "eetr". If there is an odd number of letters, you can cut the word in half from the center letter in either direction. For example, for "patrick" -> "rickpat" or “ickpatr” would both be acceptable and correct answers. Return each modified word in a new array.

console.log(lab1.questionFour('patrick,hill,trees,home'));  //should return and then log ['rickpat', 'llhi', 'eestr', 'meho'] 

console.log(lab1.questionFour('joseph,ball,square,pencil'));  //should return and then log ['ephjos', 'llba', 'aresqu', 'cilpen'] 
