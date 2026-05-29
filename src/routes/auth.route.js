const express = require('express')
const authcontroller = require('../controllers/auth.controller')

const authRouter = express.Router();

/**
 * @route post /api/auth/register
 * @description create a new user
 * @access public
 */

authRouter.post("/register" , authcontroller.registerUsercontroller )

/**
 * @route post /api/auth/login
 * @description login a user
 * @access public
 */
authRouter.post("/login" , authcontroller.loginUsercontroller )



module.exports = authRouter