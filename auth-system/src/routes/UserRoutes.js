const UserController = require("../controllers/UserController");

const userRoutes = [
    { method: 'POST', path: '/signup', handler: UserController.handleSignup },
    { method: 'POST', path: '/login', handler: UserController.handleLogin },
]

function registerUserRoutes(router) {
    userRoutes.forEach(r => {
        router[r.method.toLowerCase()](r.path, r.handler)
        //console.log(`[ROUTE] ${r.method} ${r.path}`);
    })
};

module.exports = registerUserRoutes;

