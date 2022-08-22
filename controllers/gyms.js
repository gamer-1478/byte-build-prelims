const Gym = require('../schemas/gymSchema')

const gym = (req, res) => {
    const gyms = Gym.findOne({})
    res.render('gym/gym', {gyms})
}

const gym_admin = (req, res) => {
    const gyms = Gym.findOne({})
    res.render('gym/gym_admin', {gyms})
}

const gym_admin_post = async (req, res)=> {
    const {name, location, website, email, gymLeader, image} = req.body
    const newGym = new Gym({
        name,
        location, 
        website,
        email,
        gymLeader,
        image
    })

    newGym.save().then((gym)=> {
        console.log(gym)
        res.render('gym/gym_admin')
    })
}

module.exports = {
    gym_admin, 
    gym,
    gym_admin_post
}