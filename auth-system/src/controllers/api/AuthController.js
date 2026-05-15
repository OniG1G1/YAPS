const userService = require("../../services/UserService");

function sendJson(res, status, success, message) {
  res.writeHead(status, {"Content-Type": "application/json"});
  res.end(JSON.stringify({success, message}));
}

module.exports = { // HTTP parsing AND input processing

  login(req, res) {
    let body = ""; // manually parsing req body

    req.on("data", (chunk) => (body += chunk));

    req.on("end", async () => { // repeated logic, 
      try {
        const { username, password } = JSON.parse(body);

        if (!username || !password) {
          console.warn("[Auth][Login] missing credentials");
          return sendJson(res, 400, false, "Missing username or password.");
        }

        console.info(`[Auth][Login] attempt user = ${username}`);
        const result = await userService.authenticateUser(username, password);

        if (!result.success) {
          console.warn(`[Auth][Login] failed user = ${username} reason = ${result.message}`);
          return sendJson(res, 401, false, result.message);
        }

        console.info(`[Auth][Login] success user = ${username}`);

        return sendJson(res, 200, true, result.message);
      } catch (err) { // too generic
        console.error("[Auth][Login] invalid request format:", err.message);
        return sendJson(res, 400, false, "Invalid request format.");
      }
    });
  },

  signup(req, res) {
    let body = "";

    req.on("data", (chunk) => (body += chunk));

    req.on("end", async () => {
      try {
        const { username, password } = JSON.parse(body); // could have unexpected fields, also consider validation, also what if username or password keys aren't in JSON

        if (!username || !password) { // VERY basic validation, need to extend to checking for password strength etc.
          console.warn("[Auth][Signup] missing credentials");
          return sendJson(res, 400, false, "Missing username or password.");
        }

        console.info(`[Auth][Signup] attempt user=${username}`);
        const result = await userService.createUser(username, password);

        if (!result.success) {
          console.warn(`[Auth][Signup] failed user=${username} reason=${result.message}`);
            return sendJson(res, 409, false, result.message);
        }

        console.info(`[Auth][Signup] success user=${username}`);

        return sendJson(res, 201, true, result.message);
      } catch (err) {
        // error handling, maybe create ErrorHandler class, generic error, but also specific, no exception handling
        console.error("[Auth][Signup] invalid request format:", err.message);
        return sendJson(res, 400, false, "Invalid request format."); // consider making a function, code duplication and if not corrected, may be there multiple times
      }
    });
  },
};