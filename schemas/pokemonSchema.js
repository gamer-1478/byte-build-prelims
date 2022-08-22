const mongoose = require('mongoose'),
    reqString = { type: String, required: true },
    reqNum = { type: Number, required: true }

const pokemonSchema = new mongoose.Schema({
    userId: reqString,
    name: reqString,
    type: reqString,
    weight: reqNum,
    hp: reqNum,
    pokemonId: reqString,
    image: reqString,
    attacks: reqString,
})

module.exports = mongoose.model("Pokemon", pokemonSchema)
