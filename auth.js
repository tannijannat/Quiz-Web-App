// Registration logic
const registerForm = document.getElementById('register-form');
if (registerForm) {
    registerForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent form submission

        const username = document.getElementById('register-username').value;
        const password = document.getElementById('register-password').value;

        // Store username and password in localStorage
        localStorage.setItem('username', username);
        localStorage.setItem('password', password);

        alert('Registration successful! Please login now.');
        window.location.href = 'login.html'; // Redirect to login page
    });
}

// Login logic
const loginForm = document.getElementById('login-form');
if (loginForm) {
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();  // Prevent form from reloading the page

        const enteredUsername = document.getElementById('login-username').value;
        const enteredPassword = document.getElementById('login-password').value;

        const storedUsername = localStorage.getItem('username');
        const storedPassword = localStorage.getItem('password');

        if (enteredUsername === storedUsername && enteredPassword === storedPassword) {
            // Successful login: redirect to index.html
            window.location.assign('index.html');
        } else {
            alert('Invalid username or password.');
        }
    });
}
