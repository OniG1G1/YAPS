const http = require('http');

const server = http.createServer((req, res) => {
  const now = new Date();
  const message = `Hello World! The current date and time is: ${now}`;

  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end(message);
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});


