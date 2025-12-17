const books = require('../models/bookModel')

//add book
exports.addBookController = async (req,res) =>{
    console.log("Inside addBookController");
    //get book details from reqbody
    const {title, author, pages, price, discountPrice, imageURL, abstract, language, publisher, isbn, category}= req.body
    const uploadImages = req.files.map(item=>item.filename)
    const sellerMail = req.payload
    console.log(title, author, pages, price, discountPrice, imageURL, abstract, language, publisher, isbn, category, uploadImages, sellerMail);
     try{
       //check book already exists
        const existingBook = await books.findOne({title,sellerMail})
        if(existingBook){
            res.status(401).json("Uploaded book already exists.. Request Failed !! ")
        }
         else{
            const newBook = await books.create({
               title, author, pages, price, discountPrice, imageURL, abstract, language, publisher, isbn, category, uploadImages, sellerMail
            })
            res.status(200).json(newBook)
     }
    }
    catch(error){
        console.log(error);
         res.status(500).json(error)
     }
    
}
//get home books
exports.getHomeBooksController = async (req,res)=>{
    console.log("Inside getHomeBooksController");
    try{
        //get newly added 4 books from db
        const homeBooks = await books.find().sort({_id:-1}).limit(4)
        res.status(200).json(homeBooks)
    }
    catch(error){
        console.log(error);
         res.status(500).json(error)
     }
}

//get all books-user

exports.getUserAllBooksController = async (req,res)=>{
    console.log("Inside getUserAllBooksController");
    //get login user mail from token
    const loginUserMail = req.payload
    //console.log(loginUserMail);
    
    try{
        //get all books from db except logged in user
        const allBooks = await books.find({sellerMail:{$ne:loginUserMail}})
        res.status(200).json(allBooks)
    }
    catch(error){
        console.log(error);
         res.status(500).json(error)
     }
}

//get all user uploaded Books

exports.getUserUploadProfileBooksController = async (req,res)=>{
    console.log("Inside getUserUploadProfileBooksController");
    //get login user mail from token
    const loginUserMail = req.payload
    try{
        //get all books from db that user uploaded
        const allUserBooks = await books.find({sellerMail:loginUserMail})
        res.status(200).json(allUserBooks)
    }
    catch(error){
        console.log(error);
         res.status(500).json(error)
     }
}

//get all user bought books
exports.getUserBoughtProfileBooksController = async (req,res)=>{
    console.log("Inside getUserBoughtProfileBooksController");
    //get login user mail from token
    const loginUserMail = req.payload
    try{
        //get all books from db which user bought
        const allUserPurchasedBooks = await books.find({buyerMail:loginUserMail})
        res.status(200).json(allUserPurchasedBooks)
    }
    catch(error){
        console.log(error);
         res.status(500).json(error)
     }
}
