const form = document.querySelector("#signup-form");
const message = document.querySelector("#form-message");

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = form.email.value.trim();
    const username = form.username.value.trim();
    const password = form.password.value;

    if (!email || !username || !password) {
        message.textContent = "Please fill in all required fields.";
        return;
    }

    const accountData = createAccountData(email, username, password);
    const registrationResult = await registerNewAccount(accountData);

    renderResult(registrationResult);
});

function createAccountData(email, username, password) {
    return {
        email,
        username,
        password
    };
}

async function registerNewAccount(accountData) {
    const response = await fetch("/api/accounts", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(accountData)
    });

    return response.json();
}

function renderResult(result) {
    if (result.success) {
        message.textContent = "Registration data sent successfully.";
    } else {
        message.textContent = "Registration was unsuccessful.";
    }
}