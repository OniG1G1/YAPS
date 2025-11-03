const fs = require('fs');
const path = require('path');
const querystring = require('querystring');
const UserService = require('../services/UserService');

const userService = new UserService();

const serveIndex = (res) => {
  const filePath = path.join(__dirname, '../public/index.html');
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Could not load form.');
      return;
    }
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(data);
  });
};

const handleSignup = (req, res) => {
  let body = '';
  req.on('data', chunk => body += chunk.toString());

  req.on('end', () => {
    console.log(body);
    const { username, password } = querystring.parse(body);
    const result = userService.createUser(username, password);

    res.writeHead(result.success ? 200 : 400, { 'Content-Type': 'text/plain' });
    res.end(result.message);
  });
};

module.exports = {
  serveIndex,
  handleSignup
};
