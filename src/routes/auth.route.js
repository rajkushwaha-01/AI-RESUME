const express = require('express')
const authcontroller = require('../controllers/auth.controller')
const authMiddleware = require('../middleware/auth.middleware')

const authRouter = express.Router();

/**
 * @route post /api/auth/register
 * @description create a new user
 * @access public
 */

authRouter.post("/register", authcontroller.registerUsercontroller)

/**
 * @route post /api/auth/login
 * @description login a user
 * @access public
 */
authRouter.post("/login", authcontroller.loginUsercontroller)

/**
 * @route post /api/auth/logout
 * @description logout a user
 * @access public
 */
authRouter.post("/logout", authcontroller.logoutUsercontroller)


/**
 * @route post /api/auth/get-me
 * @description get the logged in user details
 * @access private
 */

authRouter.get("/get-me", authMiddleware, authcontroller.getMeUsercontroller)



module.exports = authRouter 