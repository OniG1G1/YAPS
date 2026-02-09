const UserController = require("../controllers/UserController");

const userRoutes = [
    { method: 'POST', path: '/signup', handler: UserController.handleSignup },
    { method: 'POST', path: '/login', handler: UserController.handleLogin },
    { method: 'ANY', handler: defaultController.handle404 },
]

function registerUserRoutes(router) {
    userRoutes.forEach(r => {
        router[r.method.toLowerCase()](r.path, r.handler) // dynamic method calling: [r.method.toLowecase()] becomes .post() or .get()
        //console.log(`[ROUTE] ${r.method} ${r.path}`);
    })
};

module.exports = registerUserRoutes;

// default true