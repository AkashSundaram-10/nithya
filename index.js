      /* --- JAVASCRIPT LOGIC --- */
        const form = document.getElementById('signupForm');
        
        form.addEventListener('submit', function(event) {
            event.preventDefault(); // Stop the page from refreshing

            // Get the input values
            const username = document.getElementById('username');
            const email = document.getElementById('email');
            const password = document.getElementById('password');

            // Get error spans
            const usernameErr = document.getElementById('usernameError');
            const emailErr = document.getElementById('emailError');
            const passwordErr = document.getElementById('passwordError');

            let isFormValid = true;

            // 1. Username Validation
            if (username.value.trim() === "") {
                showError(username, usernameErr, "Username cannot be empty");
                isFormValid = false;
            } else {
                hideError(username, usernameErr);
            }

            // 2. Email Validation (Simple regex for email format)
            const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
            if (!email.value.match(emailPattern)) {
                showError(email, emailErr, "Please enter a valid email address");
                isFormValid = false;
            } else {
                hideError(email, emailErr);
            }

            // 3. Password Validation
            if (password.value.length < 8) {
                showError(password, passwordErr, "Password must be at least 8 characters");
                isFormValid = false;
            } else {
                hideError(password, passwordErr);
            }

            // Final check
            if (isFormValid) {
                alert("Success! Form is valid and ready to be sent to a database.");
                // You can clear the form here if you want: form.reset();
            }
        });

        // Function to show error
        function showError(input, errorSpan, message) {
            input.classList.add('error-border');
            errorSpan.innerText = message;
            errorSpan.style.display = 'block';
        }

        // Function to hide error
        function hideError(input, errorSpan) {
            input.classList.remove('error-border');
            errorSpan.style.display = 'none';
        }

        // Optional: Remove error as user types
        const inputs = [username, email, password];
        inputs.forEach(input => {
            input.addEventListener('input', () => {
                if (input.value.trim() !== "") {
                    input.classList.remove('error-border');
                    const errSpan = input.nextElementSibling;
                    if(errSpan) errSpan.style.display = 'none';
                }
            });
        });