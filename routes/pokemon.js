const { ensureAuthenticated } = require('../middlewares/authenticate')

const express = require('express'),
    router = express.Router(),
    User = require("../schemas/userSchema"),
    Pokemon = require('../schemas/pokemonSchema'),
    {nanoid} = require('nanoid');

router.get('/', ensureAuthenticated, async (req, res)=> {
    const userId = req.user.userId;
    const pokemons = await Pokemon.find({userId});
    res.render('pokemon', {pokemons:await NewtestArray(pokemons), user: req.user})
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

// helper function to make array of products
async function NewtestArray(products) {
    var testArray = []
    var prodLen = products.length
    var i = 0

    var NewtestArray = await new Promise((resolve, reject) => {
        while (i < prodLen) {
            i += 2
            testArray.push(products.splice(0, 3))

            if (i >= prodLen - 1) {
                resolve(testArray)
            }
            else {
                resolve(testArray)
            }
        }
    }).then(res => { return res })
    return NewtestArray
}


module.exports = router