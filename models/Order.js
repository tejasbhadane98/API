const mongoose = require("mongoose");
const {Schema} = mongoose;

const orderSchema = new Schema({
    customer_id:{type:String},
    product_id:{type:String},
    product_name:{type:String},
    quantity:{type:Number},
    // ref:"Product"
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;