const userController = require("./UserController");

module.exports = {
  login(req, res) {
    return userController.handleLogin(req, res);
  },

  signup(req, res) {
    return userController.handleSignup(req, res);
  }
};