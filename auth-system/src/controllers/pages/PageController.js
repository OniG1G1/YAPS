const fs = require("fs");
const path = require("path");

const VIEWS_DIR = path.join(__dirname, "../../../public/pages");

function render(res, viewName) {
  const filePath = path.join(VIEWS_DIR, `${viewName}.html`)

  fs.readFile(filePath, (err, data) => {
    if (err) {
      console.error(`[VIEW] Not found: ${viewName}`);
      res.writeHead(404, { "Content-Type": "text/plain" }); // insert Router handle404 method
      return res.end("Page not found");
    }

    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(data);
  });
}

const pageController = { // for now req is not needed, but might need for later implementations (i.e. params)
  home: (req, res) => {
    render(res, "login");
  },

  loginPage: (req, res) => {
    render(res, "login");
  },

  signupPage: (req, res) => {
    render(res, "signup");
  },

  successfulLogin: (req, res) => {
    render(res, "successfulLogin");
  }
};

module.exports = pageController;