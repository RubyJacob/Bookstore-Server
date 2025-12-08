//import express
const express = require('express')
const userController = require('../controller/userController')
//create router object
const router = new express.Router()
//define path for client api request
router.post('/register',userController.registerController)
//login route
router.post('/login',userController.loginController)

module.exports = router