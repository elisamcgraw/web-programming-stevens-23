
# CS-546 Lab 1 - An Intro to Node

This lab involves creating and running several functions to practice JavaScript syntax.

## Lab Submission

For this lab, you will create two files: `lab1.mjs` and `lab1.test.mjs`, and submit them in a zip file named `LastName_FirstName.zip`. For example, `Hill_Patrick.zip`. Please ensure that there are no folders inside the zip file.

## Input Validation and Error Handling

For Lab 1, you do not need to implement input validation and error handling. You can assume that the provided data will be valid. Input validation and error handling will be covered in Lecture/Lab 2.

## File Structure

You can download the lab code starting template here that includes the correct file and function names: [Download Lab1_stub.zip](#)

## Function Implementation

### lab1.mjs

In this file, you will update the content of the functions and fill in your first name, last name, and student ID. The function specifications are listed below:

```javascript
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
```

### lab1.test.mjs

In this file, you will import your functions from `lab1.mjs` and call EACH function 5 times with different inputs to ensure your functions are working correctly.

```javascript
import * as lab1 from "./lab1.mjs";

// Make 5 calls to questionOne with different inputs
console.log(lab1.questionOne(["Hello", "good", "weather", "today"])); // [9, false]

// Make 5 calls to questionTwo with different inputs
console.log(lab1.questionTwo({ a: 3, b: 2, c: 1, d: 7 }, { a: 6, b: 5, c: 4, e: 8 })); // ["d","e"]

// Make 5 calls to questionThree
console.log(lab1.questionThree([[3,3,3], [3,3,4], [5,4,2]])); // {'0': [3.9,9], '1': [4.47,10], '2': [3.8,11]}

// Make 5 calls to questionFour
console.log(lab1.questionFour('patrick,hill,trees,home')); // ['rickpat', 'llhi', 'eestr', 'meho']
```

## Function Descriptions

### questionOne(arr)

For your first function, you will calculate the count of vowels (A, E, I, O, U, not Y) in each string within the supplied array and return the sum of all counts. Additionally, a boolean should be returned indicating whether the total count is even. The result is returned as an array in the order [total count, is even].

### questionTwo(obj1, obj2)

For your second function, you will take two objects and return an array containing all the keys that are unique to each object (i.e., keys that occur in one object but not the other). The returned array is stably sorted first numerically (if the key is a string representation of a number) and then alphabetically.

### questionThree(arr)

For your third function, you will take an array of arrays (a 2D array) where each sub-array contains 3 numbers representing the sides of a triangle. You will return an object that contains the area and perimeter of each triangle. The area is rounded to 2 decimal places. The keys of the object correspond to the index of each triangle in the original array, and the values are arrays in the format [area, perimeter].

### questionFour(string)

For your fourth function, you will take each word from a comma-separated value (CSV) string, cut it in half, and put the second half in front of the first half. For example, "tree" becomes "eetr". If there is an odd number of letters, you can cut the word in half from the center letter in either direction. For example, "patrick" can become "rickpat" or "ickpatr." The modified words are returned in a new array.

---

Please replace `"YOUR FIRST NAME"`, `"YOUR LAST NAME"`, and `"YOUR STUDENT ID"` with your actual information in the `studentInfo` object in `lab1.mjs`.
