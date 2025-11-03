const UserController = require("../controllers/UserController");

function registerUserRoutes(router) {

    // Authentication routes
    router.post('/signup', UserController.handleSignup);
    router.post('/login', UserController.handleLogin);

    /*
    router.get("/users/:id", userController.getUserById);
    router.get("/users", userController.getAllUsers);
    router.post("/users", userController.createUser);
    */

    /*
    // Root redirect (flexible for future)

    router.get('/', (req, res) => {
        // If logged in, go to dashboard
        if (req.session?.user) {
            return res.redirect('/dashboard');
        }
        // Otherwise show login page
        return userController.renderLoginPage(req, res);
    });
    */
};

module.exports = registerUserRoutes;

