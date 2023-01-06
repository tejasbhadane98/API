const mongoose = require("mongoose");
const {Schema} = mongoose;

const productSchema = new Schema({
    product_id:{type:String},
    product_type:{type:String},
    product_name:{type:String},
    product_prize:{type:Number},
    Available_quantity:{type:Number}
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;