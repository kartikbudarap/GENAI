const express = require("express")
const authRouter = express.Router();
const authController = require("../controllers/auth.controller")

/**
 * @route POST /api/auth/register
 * @desc Register a new user
 * @access Public
 */
authRouter.post("/register",authController.registerController);

/**
 * @route POST /api/auth/login
 * @desc Login a user
 * @access Public
 */
authRouter.post("/login",authController.loginController);

/**
 * @route GET /api/auth/logout
 * @desc Logout a user
 * @access Public
 */
authRouter.get("/logout",authController.logoutController);



module.exports = authRouter;