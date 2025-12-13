const userService = require("../services/UserService");

const handleSignup = (req, res) => {
  let body = "";

  req.on("data", chunk => (body += chunk));
  req.on("end", async () => {
    try {
      const { username, password } = JSON.parse(body);

      if (!username || !password) {
        console.log("[Signup] missing credentials");
        return sendJson(res, 400, false, "Missing username or password.")
        return;
      }

      console.log("[Signup] processing user:", username);
      const result = await userService.createUser(username, password);

      console.log("[Signup] result:", result.success);
      sendJson(res, 200, result.success, result.message);
    } catch (err) {
      console.error("[Signup] invalid request", err.message);
      sendJson(res, 400, false, "Invalid request format.")
    }
  });
};

const handleLogin = (req, res) => {
  let body = "";

  req.on("data", chunk => (body += chunk));
  req.on("end", async () => {
    try {
      const { username, password } = JSON.parse(body);

      if (!username || !password) {
        console.log("[Login] missing credentials");
        return sendJson(res, 400, false, "Missing username or password.");
      }

      console.log("[Login] authenticating:", username);
      const result = await userService.authenticateUser(username, password);

      console.log("[Login] result:", result.success);
      sendJson(res, 200, result.success, result.message);
    } catch (err) {
      console.error("[Login] invalid request", err.message);
      sendJson(res, 400, false, "Invalid request format.");
    }
  });
};

function sendJson(res, status, success, message) {
  res.writeHead(status, {"Content-Type": "application/json"});
  res.end(JSON.stringify({success, message}));
}

module.exports = {
  handleSignup,
  handleLogin,
};

/*
------------------------------
CONSIDER'S FOR FUTURE IMPLEMENTATIONS

 - Signup and login are ALMOST generic:
      handleAuth(req, res, serviceFn, label)
*/

