const form = document.querySelector("#signup-form");
const message = document.querySelector("#form-message");

// Network errors or HTML error responses will produce unhandled rejections?
/**
 * @todo fix message, display the returned message
 * @todo distinguish network/server/parse failures
 * @todo disable repeat submissions while pending (later)
 */

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = form.email.value.trim();
    const password = form.password.value;

    if (!email || !password) {
        message.textContent = "Please fill in all required fields.";
        return;
    }

    const accountData = createAccountData(email, password);
    try {
        const registrationResult = await registerNewAccount(accountData);
        renderResult(registrationResult);
    } catch (error) {
        console.error(error);
        message.textContent = "Unable to contact the server."
    }
});

function createAccountData(email, password) {
    return {
        email,    
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