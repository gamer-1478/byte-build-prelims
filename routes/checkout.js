const express = require('express'),
    moment = require('moment'),
    now = new Date(),
    dateStringWithTime = moment(now).format('YYYY-MM-DD HH:MM:SS'),
    {nanoid} = require('nanoid'),
    router = express.Router(),
    { ensureAuthenticated, forwardAuthenticated } = require('../middlewares/authenticate.js');
    User = require('../schemas/userSchema')
    Order = require('../schemas/orderSchema')
router.get('/', (req, res)=> res.render('store/checkout'))
router.post('/', ensureAuthenticated, async (req, res)=> {
    // const {line1, line2, line3, card, name} = req.body  uncomment in final
    const user = User.findOne({userId: req.user.userId})
    const line1 = "Malibu Town Sector 47 Gurugram"
    const line2 = "Sohna Road"
    const line3 = ""
    const card = "123456789012345"
    const name = req.user.name
    const orderId = nanoid()
    const newOrder = new Order({
        orderId,
        line1,
        line2,
        line3,
        card,
        name,
        date: dateStringWithTime
    })

    newOrder.save().then(async (order)=>{
        console.log(order)
        await User.findOneAndUpdate(
            {userId: req.user.userId},
            {$push: {orders: orderId}}
            ).then((user)=>{
                console.log(user)
                res.render('store/orders', {user})
            })
    })

})

module.exports = router;