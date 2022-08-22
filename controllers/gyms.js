const Gym = require('../schemas/gymSchema')

const gym =async (req, res) => {
    const gyms = await Gym.find({})
    res.render('gym/gym', {title:'Gyms', user:req.user, gyms: await NewtestArray(gyms)})
}

const gym_admin = async(req, res) => {
    const gyms = await Gym.find({})
    res.render('gym/gym_admin', { gyms, title: 'Gyms', user: req.user})
}

const gym_admin_post = async (req, res)=> {
<<<<<<< HEAD
    const {name, location, website, email, gymLeader, image} = req.body
    const newGym = new Gym({
        name,
        location, 
        website,
        email,
        gymLeader,
        image
=======
    const { name, location, type_gym } = req.body
    const newGym = new Gym({
        name,
        location,
        type_gym
>>>>>>> bf4c51df158ca01c2517053ccd3cb771180f4575
    })

    newGym.save().then((gym)=> {
        res.render('gym/gym_admin')
    })
}

// helper function to make array of products
async function NewtestArray(products) {
    var testArray = []
    var prodLen = products.length
    var i = 0

    var NewtestArray = await new Promise((resolve, reject) => {
        while (i < prodLen) {
            i += 2
            testArray.push(products.splice(0, 2))

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


module.exports = {
    gym_admin, 
    gym,
    gym_admin_post
}