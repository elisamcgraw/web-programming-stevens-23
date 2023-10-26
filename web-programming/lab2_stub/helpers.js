/* Todo: Implment any helper functions below 
    and then export them for use in your other files.
*/

// Helper function to flatten an array
export function flattenArray(arr) {
    return arr.reduce((acc, val) => {
      return acc.concat(Array.isArray(val) ? flattenArray(val) : val);
    }, []);
  }
  
  // Helper function to sort elements based on the requirements
  export function customSort(a, b) {
    if (typeof a === 'number' && typeof b === 'number') {
      return a - b;
    } else if (typeof a === 'string' && typeof b === 'string') {
      return a.localeCompare(b, undefined, { numeric: true });
    } else {
      // Different types, prioritize numbers
      return typeof a === 'number' ? -1 : 1;
    }
  }
  


