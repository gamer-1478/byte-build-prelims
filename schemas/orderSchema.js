const mongoose = require('mongoose'),
    reqString = { type: String, required: true },
    notreqString = { type: String, required: false },
    reqNum = {type: Number, required: true}

const orderSchema = new mongoose.Schema({
        orderId: reqString,
        line1: reqString,
        line2: notreqString,
        line3: notreqString,
        card: reqString,
        date: reqString,
        name: reqString,
})

module.exports = mongoose.model("Order", orderSchema)
