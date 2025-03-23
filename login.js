const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});
// Add your JavaScript code here
document.getElementById('signInButton').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent the default form submission
    window.location.href = 'index.html'; // Redirect to index.html
});
document.getElementById('signUpButton').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent the default form submission
    window.location.href = 'index.html'; // Redirect to index.html
});