const express = require('express')
const router = express.Router()
const fs = require('fs')
const fetch = require("node-fetch");
const paypal = require('paypal-rest-sdk')

require('dotenv').config()


paypal.configure({
    'mode': 'live', //sandbox or live
    'client_id': process.env.PAYPAL_CLIENT_ID,
    'client_secret': process.env.PAYPAL_CLIENT_SECRET 
  });


router.post('/pay', (req, res, next)=> {
    fs.readFile('ProductDB.json', function(error, data){
        if(error){
            res.status(500).end()
        }
        else{
            const productsJson = JSON.parse(data)
            console.log("This is req.body.items")
            console.log(req.body.items)
            console.log("This is productsJson")
            console.log(productsJson)
            let content = [] 
            
            //Do the same as above only need to match to the product and then match it to the variation id. I would have to make sure to change ids of shop page products.

            let productSelect = req.body.items.map(product => {
                const itemJson = productsJson.find(function(i){
                    return i.productName === product.productName
                }).variations.find(function(i){
                    return i.id === product.id
                })

                console.log("This is itemJson")
                console.log(itemJson)

                product.id!=null? 
                content.push({
                "name": product.productName,
                "sku": product.id,
                "price": itemJson.variationPrice/100,
                "currency": "GBP",
                "quantity": product.qty})
                :false
            })
            
           
            let postalCategory = req.body.postalCategory
            let productTypeBreakdown = req.body.productTypeBreakdown
            

            const postageTier = () =>{
                let postageCost
            
                switch(postalCategory){
                    case "rest-of-world":
                        if(productTypeBreakdown.sample<6 && productTypeBreakdown.caddy +        productTypeBreakdown.pouch<3){                        
                            postageCost = 9.12 

                        }else if (productTypeBreakdown.caddy +  productTypeBreakdown.pouch <5){  
                            postageCost = 11.6

                        }else{
                            postageCost = 21.89

                        }               
                    break
                    
                    case "eu":                
                        if(productTypeBreakdown.sample<9 && productTypeBreakdown.caddy +        productTypeBreakdown.pouch<3){                        
                            postageCost = 5.1                     
                        }else if (productTypeBreakdown.caddy +  productTypeBreakdown.pouch <10){  
                            postageCost = 8.2

                        }else{
                            postageCost = 13.9
                        
                        }                
                    break
                
                    case "uk":
                        if(productTypeBreakdown.sample<10 && productTypeBreakdown.caddy<1 &&        productTypeBreakdown.pouch<1){                        
                            postageCost = 1.8 

                        }else if (productTypeBreakdown.caddy+productTypeBreakdown.pouch<22){  
                            postageCost = 3.6 

                        }else{
                            postageCost = 8.1
                        
                        }
                    
                    break
                    
                    case "":                
                        postageCost = 0                
                    break
                    
                    default:
                        postageCost = 0
                }

                return postageCost
            }
            
            //let postalTarrif = tariffObj[postalCategory][tier()]
            

            console.log(content)
                
            //let shipping=postalTarrif
            let shipping= postageTier()
            let productSelectPrices = content.map(item=> item.price*item.quantity)
            let productSelectTotal = productSelectPrices.reduce((acc, val)=> acc+val, shipping).toFixed(2)// fixed outcome to 2 dp to avoid errors
            let productSubTotal = productSelectPrices.reduce((acc, val)=> acc+val, 0).toFixed(2)// fixed outcome to 2 dp to avoid errors
            console.log(productSelectPrices)
            console.log(shipping)
            console.log(productSelectTotal)
            console.log(productSubTotal)
            
            

            const create_payment_json = {
                "intent": "sale",
                "payer": {
                    "payment_method": "paypal"
                },
                "redirect_urls": {
                    "return_url": `https://www.eastcottandburgess.com/success`,
                    "cancel_url": `https://www.eastcottandburgess.com/cancel`
                },
                "transactions": [{
                    "item_list": {
                        "items": content
                    },
                    "amount": {
                        "currency": "GBP",
                        "total": productSelectTotal,
                        "details":{
                            "subtotal":productSubTotal,
                            "shipping":shipping
                        }
                    },
                    "description": "first tea added to the store"
                }]
            }

            console.log(content)
        
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

        }
        
    })    
})

router.route('/success_api').post((req, res)=> {
    
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
                content.push({
                "name": product.productName,
                "sku": product.id,
                "price": itemJson.variationPrice/100,
                "currency": "GBP",
                "quantity": product.qty})
                :false
            })
            

            let postalCategory = req.body.postalCategory
            let productTypeBreakdown = req.body.productTypeBreakdown
            //let postalTarrif = tariffObj[postalCategory]

            const postageTier = () =>{
                let postageCost
            
                switch(postalCategory){
                    case "rest-of-world":
                        if(productTypeBreakdown.sample<6 && productTypeBreakdown.caddy +        productTypeBreakdown.pouch<3){                        
                            postageCost = 9.12 

                        }else if (productTypeBreakdown.caddy +  productTypeBreakdown.pouch <5){  
                            postageCost = 11.6

                        }else{
                            postageCost = 21.89

                        }               
                    break
                    
                    case "eu":                
                        if(productTypeBreakdown.sample<9 && productTypeBreakdown.caddy +        productTypeBreakdown.pouch<3){                        
                            postageCost = 5.1                     
                        }else if (productTypeBreakdown.caddy +  productTypeBreakdown.pouch <10){  
                            postageCost = 8.2

                        }else{
                            postageCost = 13.9
                        
                        }                
                    break
                
                    case "uk":
                        if(productTypeBreakdown.sample<10 && productTypeBreakdown.caddy<1 &&        productTypeBreakdown.pouch<1){                        
                            postageCost = 1.8 

                        }else if (productTypeBreakdown.caddy+productTypeBreakdown.pouch<22){  
                            postageCost = 3.6 

                        }else{
                            postageCost = 8.1
                        
                        }
                    
                    break
                    
                    case "":                
                        postageCost = 0                
                    break
                    
                    default:
                        postageCost = 0
                }

                return postageCost
            }



            let shipping=postageTier()
            let productSelectPrices = content.map(item=> item.price*item.quantity)
            let productSelectTotal = productSelectPrices.reduce((acc, val)=> acc+val, shipping).toFixed(2)// fixed outcome to 2 dp to avoid errors
            let productSubTotal = productSelectPrices.reduce((acc, val)=> acc+val, 0).toFixed(2)// fixed outcome to 2 dp to avoid errors
            
            
            
    console.log('re routed')
    const payerId = req.query.PayerID
    const paymentId = req.query.paymentId
    console.log(content)

    const execute_payment_json = {
        "payer_id": payerId,
        "transactions": [{
            "amount": {
                "currency":"GBP",
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
            res.json({message:'payment error'})
           /* here you could do throw error but that stops the server */
        } else {
            console.log(JSON.stringify(payment));
            res.json({message:'Payment Successful'})
        }
    });

}})})

//** Get requests are not registering in deployment!!! Something to do with app.get(*) when setting the static folder in production
router.get('/cancel_api', (req, res)=> res.json({message:'Payment Cancelled'}))

module.exports = router
