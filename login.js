/* --- LOGIN JAVASCRIPT LOGIC --- */
const form = document.getElementById('loginForm');
const API_URL = 'http://localhost:3000/api/login';

form.addEventListener('submit', async function(event) {
    event.preventDefault(); // Stop the page from refreshing

    // Get the input values
    const email = document.getElementById('loginEmail');
    const password = document.getElementById('loginPassword');

    // Get error spans
    const emailErr = document.getElementById('emailError');
    const passwordErr = document.getElementById('passwordError');

    let isFormValid = true;

    // 1. Email Validation
    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (!email.value.match(emailPattern)) {
        showError(email, emailErr, "Please enter a valid email address");
        isFormValid = false;
    } else {
        hideError(email, emailErr);
    }

    // 2. Password Validation
    if (password.value.trim() === "") {
        showError(password, passwordErr, "Password is required");
        isFormValid = false;
    } else {
        hideError(password, passwordErr);
    }

    // Final check - Send login request
    if (isFormValid) {
        try {
            // Disable submit button
            const submitBtn = form.querySelector('.signup-btn');
            submitBtn.disabled = true;
            submitBtn.textContent = 'Logging In...';

            // Send data to backend
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email.value.trim(),
                    password: password.value
                })
            });

            const data = await response.json();

            if (data.success) {
                alert("✅ Login Successful! Welcome back, " + data.user.username + "!");
                
                // Store user info in sessionStorage
                sessionStorage.setItem('user', JSON.stringify(data.user));
                
                form.reset();
                
                // Redirect to users page
                setTimeout(() => {
                    window.location.href = 'users.html';
                }, 1000);
            } else {
                alert("❌ Login Failed: " + data.message);
                showError(email, emailErr, "Invalid email or password");
                showError(password, passwordErr, "Invalid email or password");
            }

            // Re-enable button
            submitBtn.disabled = false;
            submitBtn.textContent = 'Log In';

        } catch (error) {
            console.error('Error:', error);
            alert("❌ Failed to connect to server. Make sure the server is running on port 3000.");
            
            // Re-enable button
            const submitBtn = form.querySelector('.signup-btn');
            submitBtn.disabled = false;
            submitBtn.textContent = 'Log In';
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

// Remove error as user types
const email = document.getElementById('loginEmail');
const password = document.getElementById('loginPassword');
const inputs = [email, password];

inputs.forEach(input => {
    input.addEventListener('input', () => {
        if (input.value.trim() !== "") {
            input.classList.remove('error-border');
            const errSpan = input.nextElementSibling;
            if(errSpan) errSpan.style.display = 'none';
        }
    });
});
