//import dotenv,express,cors
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const router = require('./routes/routing')
require('./config/db')

//create server using express
const bookstoreServer = express()
//enable  cors in express server
bookstoreServer.use(cors())
//add json parser to server
bookstoreServer.use(express.json())
//use router in server
bookstoreServer.use(router)
//create port where the server should listen in web
const PORT = 3000
//server listen in the port
bookstoreServer.listen(PORT, () => {
    console.log("Bookstore Server Started... and waiting for client request");
})
//resolve http get request http://localhost:3000/ using server
bookstoreServer.get('/', (req, res) => {
    res.status(200).send(`<h1>Bookstore Server Started... and waiting for client request</h1>`)
})