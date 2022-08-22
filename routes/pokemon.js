const express = require('express'),
    router = express.Router()
    User = require("../schemas/userSchema")
    Pokemon = require('../schemas/pokemonSchema'),
    {nanoid} = require('nanoid')

router.get('/', async (req, res)=> {
    const userId = req.user.userId
    const pokemons = await Pokemon.find({userId})
    console.log(pokemons)
    res.render('pokemon', {pokemons})
})

router.post('/add', async (req, res) => {
    const userId = req.user.userId
    const pokemons = await Pokemon.find({userId})
    const {name, weight, hp, type, image, attacks} = req.body
    const pokemonId = nanoid()
    const newPokemon = new Pokemon({
        userId,
        name,
        weight, 
        hp,
        type,
        pokemonId,
        image,
        attacks
    })

    newPokemon.save().then(() => {
        res.redirect('/pokemon')
    })
})

module.exports = router