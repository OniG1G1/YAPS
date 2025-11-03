const http = require('http');
const path = require('path');
const fs = require('fs');
const { serveIndex, handleSignup } = require('./controllers/UserController');
const PORT = 3000;

const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;
  console.log("request has been made: " + url);
  console.log("URL part: " + url, "::: Method part: " + method + "\n");

  if (url === '/' || url === '/index.html') {
    serveIndex(res);
  }

  else if (url === '/signup' && method === 'POST') {
    handleSignup(req, res);
  }

  else if (url.startsWith('/css/')) {
    const filePath = path.join(__dirname, 'public', url);
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(404);
        res.end('Not Found');
        return;
      }
      res.writeHead(200, { 'Content-Type': 'text/css' });
      res.end(data);
    });
  }
  
  else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 - Not found');
  }
});

server.listen(PORT, () => {
  console.log('Server running at http://localhost:3000' + "\n");
});
