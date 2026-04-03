// controllers/authController.js

module.exports = {
  login: (req, res) => {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Login successful (dummy)" }));
  },

  signup: (req, res) => {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Signup successful (dummy)" }));
  },
};