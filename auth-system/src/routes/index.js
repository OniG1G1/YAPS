// routes.js

const authController = require("./controllers/authController");
const pageController = require("./controllers/pageController");

module.exports = [

// Page routes

    {
        method: "GET",
        path: "/",
        handler: pageController.home
    },
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
        path: "/api/login",
        handler: authController.login
    },
    {
        method: "POST",
        path: "/api/signup",
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