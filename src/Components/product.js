//storing products in the bankend 
const mongoose = require('mongoose')

const ProductSchema = mongoose.Schema({
    title:String,
    imageURL :String,
    rating:Number,
    price:Number,
});
module.exports = mongoose.model('products',ProductSchema)
