const mongoose = require("mongoose");
const {Schema} = mongoose;

const customerSchema = new Schema({
    customer_id:{type:String},
    customer_name:{type:String},
    email:{
        required:true,
        type:String
        
    },
   balance:Number
});

const Customer = mongoose.model("Customer", customerSchema);
module.exports = Customer;