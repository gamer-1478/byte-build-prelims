const express = require('express'),
    router = express.Router(),
    Pokemon = require('../schemas/pokemonSchema');

router.get('/', async(req, res) => {
    const pokemons = await Pokemon.find({})
    res.render('pokedex', { pokemons: await NewtestArray(pokemons), user: req.user })
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