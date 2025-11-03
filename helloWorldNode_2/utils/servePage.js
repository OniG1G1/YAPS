const fs = require('fs');
const path = require('path');

function servePage(res, dateMessage) {
    fs.readFile(path.join(__dirname, '../views/index.html'), 'utf8', (err, data) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Internal Server Error');
            return;
        }

        const finalPage = data.replace('{{dateMessage}}', dateMessage);
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(finalPage);
    });
}

module.exports = servePage;
