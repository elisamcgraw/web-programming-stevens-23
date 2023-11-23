// In this file, you must perform all client-side validation for every single form input (and the role dropdown) on your pages. The constraints for those fields are the same as they are for the data functions and routes. Using client-side JS, you will intercept the form's submit event when the form is submitted and If there is an error in the user's input or they are missing fields, you will not allow the form to submit to the server and will display an error on the page to the user informing them of what was incorrect or missing.  You must do this for ALL fields for the register form as well as the login form. If the form being submitted has all valid data, then you will allow it to submit to the server for processing. Don't forget to check that password and confirm password match on the registration form!

(function () {
    // Validation functions
    function isValidName(name) {
        if (typeof name !== 'string' || name.trim().length < 2 || name.trim().length > 25 || /\d/.test(name)) {
            throw 'Name must be a string between 2 and 25 characters without numbers.';
        }
        return true;
    }

    function isValidEmail(email) {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            throw 'Invalid email format.';
        }
        return true;
    }

    function isValidPassword(password) {
        if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password)) {
            throw 'Password must be at least 8 characters long and include at least one uppercase letter, one number, and one special character.';
        }
        return true;
    }

    function isValidRole(role) {
        if (role !== 'admin' && role !== 'user') {
            throw 'Role must be either admin or user.';
        }
        return true;
    }

    // Form handling
    const form = document.getElementById('registration-form');
    const errorContainer = document.getElementById('form-error-container');
    const errorTextElement = errorContainer.getElementsByClassName('text-goes-here')[0];

    if (form) {
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            errorContainer.classList.add('hidden');

            try {
                const firstName = document.getElementById('firstNameInput').value;
                const lastName = document.getElementById('lastNameInput').value;
                const email = document.getElementById('emailAddressInput').value;
                const password = document.getElementById('passwordInput').value;
                const confirmPassword = document.getElementById('confirmPasswordInput').value;
                const role = document.getElementById('roleInput').value;

                // Perform validations
                isValidName(firstName);
                isValidName(lastName);
                isValidEmail(email);
                isValidPassword(password);
                if (password !== confirmPassword) {
                    throw 'Passwords do not match.';
                }
                isValidRole(role);

                // If validation passes, submit the form
                form.submit();
            } catch (e) {
                const errorMessageElement = document.getElementById('error-message');
                errorMessageElement.textContent = e; // Set the error message
                errorContainer.classList.remove('hidden'); // Show the error container
            
            }
        });
    }
})();
