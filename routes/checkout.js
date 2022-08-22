const express = require('express'),
    moment = require('moment'),
    now = new Date(),
    dateStringWithTime = moment(now).format('YYYY-MM-DD HH:MM:SS'),
    { nanoid } = require('nanoid'),
    router = express.Router(),
    { ensureAuthenticated, forwardAuthenticated } = require('../middlewares/authenticate.js'),
    User = require('../schemas/userSchema'),
    Product = require("../schemas/productSchema"),
    Order = require('../schemas/orderSchema');

router.get('/', (req, res) => {
    if (!req.user.cart.length > 0) {
        return res.redirect('/cart');
    }
    var total = 0;
    var products = req.user.cart.map(async (product_orig) => {
        var product = await Product.findOne({ productId: product_orig.prodid })
        product = JSON.parse(JSON.stringify(product))
        total += product.price * product_orig.quan
        product.quantity = product_orig.quan
        return product;
    })
    Promise.all(products).then(products => {
        res.render("store/checkout", { user: req.user, cart: products, total: total })
    }).catch(err => {
        console.log(err)
    })
});

router.post('/', ensureAuthenticated, async (req, res) => {
    const {line1, line2, line3, card, name} = req.body;
    const user = await User.findOne({ userId: req.user.userId })
    const orderId = nanoid()

    if (!user) {
        return res.send({ success: false, message: 'User not found' })
    }
    if (!line1 || !line2 || !line3 || !card || !name) {
        return res.send({ success: false, message: 'Please fill in all fields' })
    }
    const newOrder = new Order({
        orderId,
        line1,
        line2,
        line3,
        card,
        name,
        cart: user.cart,
        date: dateStringWithTime
    })

    newOrder.save().then(async (order) => {
        console.log(order)
        await User.findOneAndUpdate(
            { userId: req.user.userId },
            { $push: { orders: orderId }, $set: { cart: [] } }
        ).then((user) => {
            console.log(user)
            res.send({ success: true })
        })
    })

})

module.exports = router;