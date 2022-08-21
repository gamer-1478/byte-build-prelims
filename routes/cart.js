const express = require('express'),
    router = express.Router(),
    { ensureAdminAuthenticated, ensureAuthenticated } = require('../middlewares/authenticate.js'),
    Product = require("../schemas/productSchema"),
    User = require("../schemas/userSchema");


router.get('/', ensureAuthenticated, (req, res)=> {
    if (!req.user.cart.length > 0) {
        return res.render("store/cart", { user: req.user, cart: [] })
    }
    var products = req.user.cart.map( async (product_orig)=> {
        var product = await Product.findOne({ productId: product_orig.prodid })
        product = JSON.parse(JSON.stringify(product))
        product.quantity = product_orig.quan
        return product;
    })
    Promise.all(products).then(products => {
        res.render("store/cart", { user: req.user, cart: products })
    }).catch(err => {
        console.log(err)
    })
})

module.exports = router;