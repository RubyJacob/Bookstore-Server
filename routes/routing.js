//import express
const express = require('express')
const userController = require('../controller/userController')
const bookController = require('../controller/bookController')
const jwtMiddleware = require('../middlewares/jwtMiddleware')
const multerMiddleware = require('../middlewares/multerMiddleware')
//create router object
const router = new express.Router()
//define path for client api request
router.post('/register',userController.registerController)
//login route
router.post('/login',userController.loginController)
//googlelogin route
router.post('/google/sign-in',userController.googleLoginController)

//add book -request body -form data -multer
router.post('/user/book/add',jwtMiddleware,multerMiddleware.array('uploadImages',3),bookController.addBookController)


module.exports = router