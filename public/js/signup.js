const form = document.querySelector("#signup-form");
const message = document.querySelector("#form-message");

// Network errors or HTML error responses will produce unhandled rejections?

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
    try {
        const registrationResult = await registerNewAccount(accountData);
    } catch (error) {
        console.error(error);
        message.textContent = "Unable to contact the server."
    }

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

    const result = await response.json();

    if (!response.ok) {
        return {
            success: false,
            message: result.mesage ?? "Registration was unsuccessful."
        }
    }

    return result;
}

function renderResult(result) {
    if (result.success) {
        message.textContent = "Registration data sent successfully.";
    } else {
        message.textContent = "Registration was unsuccessful.";
    }
}