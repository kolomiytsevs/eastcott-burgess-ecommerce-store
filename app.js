const express = require('express')
const helmet = require('helmet')
const ejs = require('ejs')
const paypal = require('paypal-rest-sdk')
const ProductDB = require('./ProductDB')
const mongoose = require('mongoose')
const cors = require('cors')
const mongodb = require('mongodb')
const bodyParser = require('body-parser')
const path = require('path'); //inbuilt path module for production
const fetch = require("node-fetch");
const fs = require('fs') //used to read json files with fs.readFile('fileName.json', function(error, data){if(error){res.status(500).end()}else{res.render('pageTORender.ext', {items:JSON.parse(data)})}})
const request = require('request')
const compression = require('compression')

const app = express()
require('dotenv').config()
const port = process.env.PORT || 5000
const Schema = mongoose.Schema
const BasketDrawerItemCardRouter = express.Router()

app.use(function (req, res, next) {
    res.removeHeader("x-powered-by");
    next();
  });
  app.use(helmet({
    dnsPrefetchControl: false
  }))
app.use(bodyParser.json())
app.use(compression())
app.use(express.json())
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  app.use('/api/paypal', require('./routes/api/paypal'));

  if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));
  
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
  } 



let MONGO_URI= process.env.MONGO_URI_SECRET; //Hide this in env variables

mongoose.connect(MONGO_URI, {useNewUrlParser:true}).then(
    ()=> {console.log("database is connected")},
    err => {console.log("cannot connect to database")}
)



app.route('/signup').post((req, res)=>{
    const {email} = req.body

    if(!email){
        res.send('Please Enter and Email Address')
    }

    //Construct postData
    const data = {
        members:[{
            email_address:email,
            status:'subscribed'
        }]
    }

    const postData = JSON.stringify(data)

    const options = {
        url: 'https://us20.api.mailchimp.com/3.0/lists/47bdc08577',
        method: 'POST',
        headers:{
            Authorization: process.env.MAILCHIMP_AUTH
        },
        body: postData
    }

    request(options, (err, response, body)=>{
        if(err){
            res.send(err)
        }else{
            if(response.statusCode===200){
                res.redirect('http://localhost:5000')
            }else(res.redirect('http://localhost:5000'))
        }
    })
})


//server listening on port defined above
app.listen(port, ()=> console.log(`server started on port ${port}`))
