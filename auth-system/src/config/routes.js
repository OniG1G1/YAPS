// routes.js

const authController = require("../controllers/api/AuthController");
const pageController = require("../controllers/PageController");

module.exports = [

    // express: router is the class, and you declare routes (.get()), you define, use hashmap and json, and pass that the router, others you invoke, none which better
    // e.g. routes: big json vars, 300 diff routes, then one has an error, unless router has amazing error handler, will have generic error
    // express approach is better handling
    // instead of using lamba (my version), declaring the class, etc. declarative approach, more complex to implement

// Page routes

    {
        method: "GET",
        path: "/",
        handler: pageController.home
        //not 
    }, // methods, use array
    {
        method: "GET",
        path: "/login",
        handler: pageController.loginPage
    },
    {
        method: "GET",
        path: "/signup",
        handler: pageController.signupPage
    },
{
        method: "GET",
        path: "/successfulLogin",
        handler: pageController.successfulLogin
    },
    /*
    {
        method: "GET",
        path: "/dashboard",
        requiresAuth: true,
        handler: pageController.dashboard
    },
    */

// API routes

    {
        method: "POST",
        path: "/api/user/login",
        handler: authController.login
    },
    {
        method: "POST",
        path: "/api/user/signup",
        handler: authController.signup
    },
    /*
    {
        method: "GET",
        path: "/api/session",
        handler: authController.session
    },
    */

];