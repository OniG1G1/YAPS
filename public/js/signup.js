const form = document.querySelector("#signup-form");
const message = document.querySelector("#form-message");

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const email = form.email.value.trim();
    const username = form.username.value.trim();
    const password = form.password.value;

    if (!email || !username || !password) {
        message.textContent = "Please fill in all required fields.";
        return;
    }

    message.textContent = "Account creation is not available yet.";
});