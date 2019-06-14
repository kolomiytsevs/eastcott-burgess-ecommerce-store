const mongoose = require('mongoose')

const Schema = mongoose.Schema

const basketSchema = new Schema({
    "name": String,
    "sku": String,
    "price": Number,
    "currency": String,
    "quantity": Number
})

module.export = BasketDrawerItemCard = mongoose.model('BasketDrawerItemCard', basketSchema)