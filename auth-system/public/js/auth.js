document.addEventListener("DOMContentLoaded", () => {
  const loginForm =
    document.querySelector("form[action='/login']") || document.getElementById("loginForm"); 
    // querySelector only works cuz there's only one form, consider only using getElemtnByID, more concrete
  const signupForm =
    document.querySelector("form[action='/signup']") || document.getElementById("signupForm");

  if (loginForm) {
    console.log("[Auth] Login form initialized"); // consider better logger
    handleAuthForm(loginForm, "/login", "loginFeedback");
  }

  if (signupForm) {
    console.log("[Auth] Signup form initialized");
    handleAuthForm(signupForm, "/signup", "signupFeedback");
  }
});

function handleAuthForm(form, endpoint, feedbackId) {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    const feedbackEl = document.getElementById(feedbackId);

    // Reset UI state
    feedbackEl.classList.remove("error", "success"); //consider using toggle

    try {
      console.log(`[Auth] POST ${endpoint}`, data);
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      console.log(`[Auth] Response status: ${response.status}`); 
      // comes from header and so is available immediately, so no need to unpack body
      // optinoally do a check before reading JSON i.e. if(!response.ok) {...}
      // https://www.geeksforgeeks.org/javascript/javascript-fetch-method/

      const result = await response.json();
      console.log("[Auth] Response body:", result);

      if (result.success) {
        console.log("[Auth] Authentication successful → redirect");
        window.location.href = "/successfulLogin";
      } else {
        console.warn("[Auth] Authentication failed:", result.message);
        feedbackEl.textContent = result.message;
        feedbackEl.classList.add("error");
      }

    } catch (err) {
      console.error("[Auth] Network or parsing error:", err);
      feedbackEl.textContent = "An unexpected error occurred.";
      feedbackEl.classList.add("error");
    }
  });
}
