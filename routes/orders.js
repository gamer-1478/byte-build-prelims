const express = require('express'),
    router = express.Router()
    User = require("../schemas/userSchema")
    Order = require("../schemas/orderSchema")

router.get('/', async (req, res)=>{
    const user = await User.findOne({userId: req.user.userId})
    let orders = []
    await user.orders.forEach(async order => {
        let foundOrder = await Order.findOne({orderId: order})
        orders.push(foundOrder)
        console.log(orders)
    })

    function render(){
        res.render('store/orders', {orders})
    }
    setTimeout(render, 1000);
})


module.exports = router