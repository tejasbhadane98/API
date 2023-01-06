const router = require("express").Router();
const Customer = require("../models/Customer");
const Order = require("../models/Order");
const Product = require("../models/Product");
const bodyParser = require("body-parser");

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());


router.post('/product', async (req, res) => {
    try {
        const products = await Product.create(
            // product_id: req.body.product_id,
            // product_type: req.body.product_type,
            // product_name: req.body.product_name,
            // product_prize: req.body.product_prize,
            // Available_quantity: req.body.Available_quantity

            req.body);
        res.json({
            products, ok: "Send"
        })
        // res.status(200).json({
        //     products
        // });
        // console.log("Hello");

    }
    catch (e) {
        res.status(400).json({
            message: e.message
        })
    }
});

router.get('/product/:ID', async (req, res) => {
    try {
        const product = await Product.find({ _id: req.params.id });
        res.status(200).json({
            product
        });
    }
    catch (e) {
        res.status(400).json({
            message: e.message
        })
    }
});

router.post('/orders', async (req, res) => {
    try {
        // console.log("Hii")
        const orders = await Order.create({
            customer_id: req.body.customer_id,
            product_id: req.body.product_id,
            product_name: req.body.product_name,
            quantity: req.body.quantity

        });

    }
    catch (e) {
        res.status(400).json({
            message: e.message
        })
    }
});


router.post('/customer', async (req, res) => {
    try {
        // console.log("Hlll")
        const customerData = await Customer.create(req.body)
        res.json({ customerData, ok: "Send" })
    }
    catch (e) {
        res.status(400).json({
            message: e.message
        })
    }
});

router.get('/orders/:orderID', async (req, res) => {
    const { customer_id } = req.params;
    try {
        const orderI = await Order.findOne({ _id: customer_id });
        if (!orderI) {
            res.status(404).json({
                message: "There is No OrderId Found with that Id"
            })
        }
        res.status(200).json(
            orderI
        )
    }
    catch (e) {
        res.status(400).json({
            message: e.message
        })
    }
});


// router.get('/product/:productID', async (req, res) => {
//     const {product_id} = req.params;
//     try {
//         const productid = await Order.findOne({_id:product_id});
//         if(!productid){
//             res.status(404).json({
//                 message:"There is No Product ID Found with that Id"
//             })
//         }
//         res.status(200).json(
//             productid
//         )
//     }
//     catch (e) {
//         res.status(400).json({
//             message:e.message
//         })
//     }
// });



router.get('/customer/:id', async (req, res) => {

    try {
        const customerID = await Customer.find({ _id: req.params.id });
        if (!customerID) {
            res.status(404).json({
                message: "There is No Customer ID Found with that Id"
            })
        }
        res.status(200).json({
            status: "Success",
            customerID
        }
        )
    }
    catch (e) {
        res.status(400).json({
            message: e.message
        })
    }
});

router.put("/productName/:product_id", async (req, res) => {

    try {
        const detailsUpdate = await Product.updateOne({ _product_id: req.params.product_id }, req.body)
        res.status(200).json({
            status: "Updated",
            detailsUpdate
        }
        )
       
    }
    catch(err){
        res.status(400).json({
            message: e.message
        })
    }

    
})


router.put("/email/costOfAnOrder", async (req, res) => {
    let quantityInput = parseInt(req.body);
    let total_Cost = quantityInput * Product.product_prize;
    try {
        if (total_Cost > Customer.balance) {
            res.status(400).json({
                message: "Insufficient Funds"
            })
        }
        else {
            updateBalance = Customer.balance - total_Cost;
            Customer.balance = await Customer.updateOne({ balance: Customer.balance }, { $set: { updateBalance } })

        }
    }
    catch (e) {
        res.status(400).json({
            message: e.message
        })
    }


})



module.exports = router;