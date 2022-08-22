const express = require('express'),
    router = express.Router()
    User = require("../schemas/userSchema")
    Pokemon = require('../schemas/pokemonSchema')

router.get('/', async (req, res)=> {
    const pokemons = await Pokemon.find({})
    res.render('pokemon', {pokemons})
})

module.exports = router