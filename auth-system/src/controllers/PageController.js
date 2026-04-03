const fs = require("fs");
const path = require("path");

const publicPath = path.join(__dirname, "../../public/pages");

function sendHTML(res, filePath) {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/plain" });
      return res.end("Page not found");
    }

    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(data);
  });
}

const pageController = {
  home: (req, res) => {
    sendHTML(res, path.join(publicPath, "login.html"));
  },

  loginPage: (req, res) => {
    console.log(path.join(publicPath, "login.html"));
    sendHTML(res, path.join(publicPath, "login.html"));
  },

  signupPage: (req, res) => {
    sendHTML(res, path.join(publicPath, "signup.html"));
  },

  successfulLogin: (req, res) => {
    sendHTML(res, path.join(publicPath, "successfulLogin.html"));
  }
};

module.exports = pageController;