const form = document.querySelector("#login-form");
const message = document.querySelector("#form-message");

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const email = form.email.value.trim();
    const password = form.password.value;

    if (!email || !password) {
        message.textContent = "Please fill in all required fields.";
        return;
    }

    message.textContent = "Login is not available yet.";
});