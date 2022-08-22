const express = require('express'),
    router = express.Router()
    Pokemon = require('../schemas/pokemonSchema'),

router.get('/', async(req, res) => {
    const pokemons = await Pokemon.find({})
    res.render('pokedex', {pokemons})
})

module.exports = router