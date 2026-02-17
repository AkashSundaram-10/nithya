      /* --- JAVASCRIPT LOGIC --- */
        const form = document.getElementById('signupForm');
        const API_URL = 'http://localhost:3000/api/users';
        
        form.addEventListener('submit', async function(event) {
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

            // Final check - Send to MongoDB
            if (isFormValid) {
                try {
                    // Disable submit button
                    const submitBtn = form.querySelector('.signup-btn');
                    submitBtn.disabled = true;
                    submitBtn.textContent = 'Signing Up...';

                    // Send data to backend
                    const response = await fetch(API_URL, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            username: username.value.trim(),
                            email: email.value.trim(),
                            password: password.value
                        })
                    });

                    const data = await response.json();

                    if (data.success) {
                        alert("✅ Success! Your account has been created and saved to the database.");
                        form.reset();
                        // Redirect to users page after a short delay
                        setTimeout(() => {
                            window.location.href = 'users.html';
                        }, 1000);
                    } else {
                        alert("❌ Error: " + data.message);
                    }

                    // Re-enable button
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Sign Up';

                } catch (error) {
                    console.error('Error:', error);
                    alert("❌ Failed to connect to server. Make sure the server is running on port 3000.");
                    
                    // Re-enable button
                    const submitBtn = form.querySelector('.signup-btn');
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Sign Up';
                }
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