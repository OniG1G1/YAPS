const path = require('path');
const { DateHandler } = require('./handlerFactory');

// define route handlers using a factory design pattern
const routes = {
    '/': new DateHandler(d => d, 'Today is '), 
    '/index.html': new DateHandler(d => d, 'Today is '),
    '/now': new DateHandler(d => d, 'Today is '),

    '/yesterday': new DateHandler(d => {
        d.setDate(d.getDate() - 1);
        return d;
    }, 'Yesterday was '),

    '/tomorrow': new DateHandler(d => {
        d.setDate(d.getDate() + 1);
        return d;
    }, 'Tomorrow will be')
};

function handle(req, res) {
    const handler = routes[req.url];
    if (handler) {
        handler.handle(req, res);
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 - Page not found');
    }
}

module.exports = { handle };
