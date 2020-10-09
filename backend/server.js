// Import the express library in this file
const express = require('express');
// Assign to server the express library
const server = express();


// Import body-parser
const bodyParser = require('body-parser');

// Import cors
const cors = require('cors');



// Import cloudinary
const cloudinary = require('cloudinary');
cloudinary.config(
    {
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.API_KEY,
        api_secret: process.env.API_SECRET
    }
)
// Import express-form-data
const expressFormData = require('express-form-data');


// Import mongoose (for connecting MongoDB)
const mongoose = require('mongoose');
const ProductRoutes = require('./routes/ProductRoutes');



const dbURL = "mongodb+srv://emad:emad@cluster0.hqtag.mongodb.net/users?retryWrites=true&w=majority";

mongoose
    .connect(dbURL, {useNewUrlParser: true, useUnifiedTopology: true})
    // for successful promise
    .then( 
        ()=>{
            console.log('Connected to MongoDB')
        } 
    )
    // for failed promise
    .catch(
        (e)=> {
            console.log('an error occured', e)
        }
    );

server.use(bodyParser.urlencoded( {extended: false} ));
server.use(bodyParser.json());
server.use(cors());
server.use(expressFormData.parse());

server.get(
    //1st argument
    '/',
    //2nd argument
    (req, res)=>{
        const theHTML = "<h1>Welcome to My App</h1>";
        res.send(theHTML);
    }
);


server.use(
    '/products',
    ProductRoutes
)



server.get(
    '/404',
    (req, res) => {
        res.send("<h1>404<h1>");
    }
);

server.get(
    '*',
    (req, res) => {
       res.redirect('/404')
    }
);

server.listen(
    // port number
    process.env.PORT || 3002, 
    // callback when (and if) the connection is OK
    () => {
        console.log('Your server is now running http://localhost:3002/')
    }
)