const path = require('path');
const querystring = require("querystring");
const userService = require("../services/UserService");

const handleSignup = (req, res) => {
  let body = "";
  req.on("data", chunk => (body += chunk.toString()));
  req.on("end", () => {
    try {
      // Parse JSON body
      const data = JSON.parse(body);
      const { username, password } = data;

      // Missing fields → 400
      if (!username || !password) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ success: false, message: "Missing username or password." }));
        return;
      }

      // Call service
      const result = userService.createUser(username, password);

      // Logical failure → 200, success flag indicates outcome
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(result));

    } catch (err) {
      // JSON parse error or unexpected server error
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ success: false, message: "Invalid request format." }));
    }
  });
};



const handleLogin = (req, res) => {
  let body = "";
  req.on("data", chunk => (body += chunk.toString()));
  req.on("end", () => {
    try {
      // Parse JSON body
      const data = JSON.parse(body);
      const { username, password } = data;

      // Missing fields → 400
      if (!username || !password) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ success: false, message: "Missing username or password." }));
        return;
      }

      // Call service
      const result = userService.authenticateUser(username, password);

      // Logical failure → 200
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(result));

    } catch (err) {
      // JSON parse error or unexpected server error
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ success: false, message: "Invalid request format." }));
    }
  });
};

module.exports = {
  handleSignup,
  handleLogin,
};

