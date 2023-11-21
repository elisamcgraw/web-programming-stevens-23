//Here is where you will do all of the logic and processing for the palindrome and prime checking.

(function() {
    const palindromeCheckerMethods = {
      isPalindrome: function(str) {
  // Convert to lower case and remove all non-alphanumeric chars except commas
        str = str.toLowerCase().replace(/[^a-z0-9,]/g, '');
        return str.split(',').map(s => {
          let cleaned = s.replace(/,/g, '').trim(); // Remove commas for palindrome check
          if (cleaned === '') return false; // If the cleaned string is empty, return false
          return cleaned === cleaned.split('').reverse().join(''); // Check each segment
        });
      },
      isPrime: function(num) {
        if (num <= 1) return false; // Negatives, 0 and 1 are not prime numbers
        if (num <= 3) return true; // 2 and 3 are prime numbers
        if (num % 2 === 0 || num % 3 === 0) return false; // Exclude multiples of 2 and 3
  
        for (let i = 5; i * i <= num; i += 6) {
          if (num % i === 0 || num % (i + 2) === 0) return false; // Check for prime by testing divisibility
        }
        return true;
      }
    };
  
    // Event listener for form submission
    document.getElementById('palindromeForm').addEventListener('submit', function(event) {
      event.preventDefault(); // Prevent default form submission
  
      // Clear previous results and errors
      document.getElementById('palindromes').innerHTML = '';
      const existingError = document.querySelector('.error');
      if (existingError) existingError.remove();
  
      const input = document.getElementById('palindrome_input').value.trim();
      if (!input) {
        displayError('Error: Please enter some text to check.');
        return;
      }
  
      const palindromeResults = palindromeCheckerMethods.isPalindrome(input);
      const primeCountStatus = palindromeCheckerMethods.isPrime(palindromeResults.filter(Boolean).length);
      displayResults(palindromeResults, primeCountStatus);
    });
  
    function displayError(message) {
      const errorP = document.createElement('p');
      errorP.className = 'error';
      errorP.textContent = message;
      document.getElementById('palindromeForm').insertAdjacentElement('afterend', errorP);
    }
  
    function displayResults(results, isPrimeCount) {
        const resultsElement = document.createElement('li');
        resultsElement.textContent = `Results: [${results.join(', ')}]`;
        resultsElement.className = isPrimeCount ? 'prime' : 'not-prime';
        document.getElementById('palindromes').appendChild(resultsElement);
      }
      
  })();
  
  