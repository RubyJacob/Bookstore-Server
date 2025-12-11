//import express
const express = require('express')
const userController = require('../controller/userController')
const bookController = require('../controller/bookController')
const jwtMiddleware = require('../middlewares/jwtMiddleware')
//create router object
const router = new express.Router()
//define path for client api request
router.post('/register',userController.registerController)
//login route
router.post('/login',userController.loginController)
//googlelogin route
router.post('/google/sign-in',userController.googleLoginController)

//add book
router.post('/user/book/add',jwtMiddleware,bookController.addBookController)


module.exports = router