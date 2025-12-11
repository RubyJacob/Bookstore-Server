const books = require('../models/bookModel')

//add book
exports.addBookController = async (req,res) =>{
    console.log("Inside addBookController");
    console.log(req.body);
    
    //get book details from reqbody
    // const {title, author, pages, price, discountPrice, imageURL, abstract, language, publisher, isbn, category, uploadImages}= req.body
    // console.log(title, author, pages, price, discountPrice, imageURL, abstract, language, publisher, isbn, category, uploadImages);
    res.status(200).json("Add book request received")
}