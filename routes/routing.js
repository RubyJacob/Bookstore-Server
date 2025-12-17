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
//get home books -guest user
router.get('/books/home',bookController.getHomeBooksController)


//-------authorized user-----
//add book -request body -form data -multer
router.post('/user/book/add',jwtMiddleware,multerMiddleware.array('uploadImages',3),bookController.addBookController)

//get all books -books page
router.get('/books/all',jwtMiddleware,bookController.getUserAllBooksController)

//get all user uploaded books page
router.get('/user-books/all',jwtMiddleware,bookController.getUserUploadProfileBooksController)

//get all user purchased books page
router.get('/user-books/purchase',jwtMiddleware,bookController.getUserBoughtProfileBooksController)


module.exports = router