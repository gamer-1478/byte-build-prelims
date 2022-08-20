const mongoose = require('mongoose'),
    reqString = { type: String, required: true },
    reqNum = {type: Number, required: true}

const productSchema = new mongoose.Schema({
    name: reqString,
    type: reqString,
    quantity: reqNum,
    description: reqString,
    productId: reqString,
    price: reqNum,
})

module.exports = mongoose.model("Product", productSchema)
