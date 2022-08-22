const express = require('express'),
    router = express.Router(),
    User = require("../schemas/userSchema"),
    Product = require('../schemas/productSchema'),
    Order = require("../schemas/orderSchema");

router.get('/', async (req, res) => {
    const user = await User.findOne({ userId: req.user.userId })
    let orders = []
    await user.orders.forEach(async order => {
        let foundOrder = await Order.findOne({ orderId: order })
        foundOrder = foundOrder.toObject()
        var total = 0;
        var products = foundOrder.cart.map(async (product_orig) => {
            var product = await Product.findOne({ productId: product_orig.prodid })
            product = JSON.parse(JSON.stringify(product))
            total += product.price * product_orig.quan
            product.quantity = product_orig.quan
            return product;
        })
        Promise.all(products).then(products => {
            foundOrder.cart = products
            console.log(foundOrder.cart)
            foundOrder.total = total
            orders.push(foundOrder)
        })
    })
    function render() {
        res.render('store/orders', {
            orders, user: req.user
        })
    }
    setTimeout(render, 1000);
})


module.exports = router