const mongoose = require('mongoose'),
    reqString = { type: String, required: true },
    reqNum = { type: Number, required: true }

const pokemonSchema = new mongoose.Schema({
    name: reqString,
    type: reqString,
    weight: reqNum,
    hp: reqNum
})

module.exports = mongoose.model("Pokemon", pokemonSchema)
