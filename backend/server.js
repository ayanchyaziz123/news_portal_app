const express = require('express')
const path = require('path');
const connectDatabase = require('./config/database');
const cors = require("cors");
const app = express();
var bodyParser = require('body-parser');
require('dotenv').config();




// // for parsing application/json
app.use(bodyParser.json()); 
app.use(express.json());

// // for parsing application/xwww-
// app.use(bodyParser.urlencoded({ extended: true })); 
// //form-urlencoded

// // for parsing multipart/form-data

// app.use(express.static('./public/uploads'));



// // for parsing multipart/form-data

app.use(express.static('./public/uploads'));

connectDatabase();

app.use(cors({ origin: true, credentials: true }));
const user = require('./routes/userRoute');
const article = require('./routes/productRoute');
const order = require('./routes/orderRoute');
const category = require('./routes/categoryRoute');






// API for users
app.use('/api/user', user);

// API for article
app.use('/api/article', article);


// API for users
app.use('/api/order', order);

// API for users
app.use('/api/category', category);


const  errorHandler = (err, req, res, next) => {
    if(res.headersSent)
    {
        return next(err);
    }
    res.status(500).json({
        detail: err
    })
}
app.use(errorHandler);


app.get('/', (req, res) => {
    res.send('Hello World!')
})

const PORT = 4000
app.listen(PORT, () => {
    console.log(`Example app->> listening at http://localhost:${PORT}`)
})
