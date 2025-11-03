document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.querySelector("form[action='/login']") || document.getElementById("loginForm");
  const signupForm = document.querySelector("form[action='/signup']") || document.getElementById("signupForm");

  if (loginForm) handleAuthForm(loginForm, "/login", "loginFeedback");
  if (signupForm) handleAuthForm(signupForm, "/signup", "signupFeedback");
});

function handleAuthForm(form, endpoint, feedbackId) {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    const feedbackEl = document.getElementById(feedbackId);

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      // Clear old styles
      feedbackEl.classList.remove("error", "success");

      if (result.success) {
        // ✅ redirect immediately on success
        window.location.href = "/home.html";
      } else {
        // ❌ show errors inline
        feedbackEl.textContent = result.message;
        feedbackEl.classList.add("error");
      }
    } catch (err) {
      feedbackEl.textContent = "An unexpected error occurred.";
      feedbackEl.classList.add("error");
    }
  });
}
