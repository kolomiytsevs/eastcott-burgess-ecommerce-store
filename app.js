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
//Static file declaration
/*app.use(express.static(path.join(__dirname, 'client/build')));

//production mode
if(process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));
  //
  app.get('*', (req, res) => {
    res.sendfile(path.join(__dirname = 'client/build/index.html'));
  })
}
//build mode
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/client/public/index.html'));
  })*/

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

/*const basketSchema = new Schema({
    "name": String,
    "sku": String,
    "price": Number,
    "currency": String,
    "quantity": Number
})

const BasketDrawerItemCard = mongoose.model('BasketDrawerItemCard', basketSchema)

app.route('/Content').get((req, res)=> {
    BasketDrawerItemCard.find((err, data)=> err? console.log(err):res.json(data))   
})

paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': process.env.PAYPAL_CLIENT_ID,
    'client_secret': process.env.PAYPAL_CLIENT_SECRET 
  });

app.set('view engine', 'ejs')

//app.get('/', (req, res)=> res.render('index'))

app.route('/pay').post((req, res)=> {
    fs.readFile('ProductDB.json', function(error, data){
        if(error){
            res.status(500).end()
        }
        else{
            const productsJson = JSON.parse(data)
            console.log(req.body.items)
            
            let content = [] 
            
            //Do the same as above only need to match to the product and then match it to the variation id. I would have to make sure to change ids of shop page products.

            let productSelect = req.body.items.map(product => {
                const itemJson = productsJson.find(function(i){
                    return i.productName === product.productName
                }).variations.find(function(i){
                    return i.id === product.id
                })

                console.log(itemJson)

                product.id!=null? 
                content.push({"name": product.productName,
                "sku": product.id,
                "price": itemJson.variationPrice/100,
                "currency": "USD",
                "quantity": product.qty})
                :false
            })
            
            let tariffObj = {
                "uk": 3.6,
                "us":11.6,
                "rest-of-world":11.6,
                "eu":8.2
            }


            let postalCategory = req.body.postalCategory
            let postalTarrif = tariffObj[postalCategory]
            

            console.log(content)
                
            let shipping=postalTarrif
            let productSelectPrices = content.map(item=> item.price*item.quantity)
            let productSelectTotal = productSelectPrices.reduce((acc, val)=> acc+val, shipping).toFixed(2)// fixed outcome to 2 dp to avoid errors
            let productSubTotal = productSelectPrices.reduce((acc, val)=> acc+val, 0).toFixed(2)// fixed outcome to 2 dp to avoid errors
            console.log(productSelectPrices)
            console.log(postalTarrif)
            console.log(productSelectTotal)
            
            

            const create_payment_json = {
                "intent": "sale",
                "payer": {
                    "payment_method": "paypal"
                },
                "redirect_urls": {
                    "return_url": `https://stark-plains-78216.herokuapp.com/success`,
                    "cancel_url": `https://stark-plains-78216.herokuapp.com/cancel`
                },
                "transactions": [{
                    "item_list": {
                        "items": content
                    },
                    "amount": {
                        "currency": "USD",
                        "total": productSelectTotal,
                        "details":{
                            "subtotal":productSubTotal,
                            "shipping":shipping
                        }
                    },
                    "description": "first tea added to the store"
                }]
            }
        
            paypal.payment.create(create_payment_json, function (error, payment) {
                if (error) {
                    throw error;
                } else {
                    console.log("Create Payment Response");
                    console.log(payment);
                    for(let i=0;i<payment.links.length; i++){
                       if(payment.links[i].rel === "approval_url"){
                           let redirectURL = payment.links[i].href
                            res.json({redirectUrl : redirectURL})
                       }
                   }
                }
            });
        
            app.route('/success_api').post( (req, res)=> {
                console.log('re routed')
                const payerId = req.query.PayerID
                const paymentId = req.query.paymentId
        
                const execute_payment_json = {
                    "payer_id": payerId,
                    "transactions": [{
                        "item_list": {
                        "items": content
                    },
                        "amount": {
                            "currency":"USD",
                            "total": productSelectTotal,
                            "details":{
                                "subtotal":productSubTotal,
                                "shipping":shipping
                            }
                        }
                    }]
                }
        
                paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
                    if (error) {
                        console.log(error.response);
                        throw error;
                    } else {
                        console.log(JSON.stringify(payment));
                        res.json({message:'Payment Successful'})
                    }
                });
        
            })

        }
        
    })    
})

//** Get requests are not registering in deployment!!! Something to do with app(*) when setting the static folder in production. Resolved by using routes/api/paypal.js routing. Doesn't get confused in production. 

app.post('/cancel_api', (req, res)=> res.json({message:'Payment Cancelled'}))*/

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