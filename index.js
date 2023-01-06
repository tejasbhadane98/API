const mongoose = require("mongoose");
const mongodb = require("mongodb");
const express = require("express");
const app = express();
// app.use(express.urlencoded());
const orderCustomer = require("./routes/orderCustomer")

mongoose.connect("mongodb://0.0.0.0:27017/api_web_tech_assignment", ()=>
console.log("Connected to Database"));

app.use('/', orderCustomer)

app.listen(3000, ()=>console.log("Server is set up at Port no", 3000));