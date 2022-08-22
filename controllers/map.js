require("dotenv").config()
const Gym = require('../schemas/gymSchema')

module.exports = map = async (req, res)=>{
    let gyms = await Gym.find({})
    gyms = await JSON.parse(JSON.stringify(gyms))

    gyms = gyms.map((gym, i)=>{
        gym._id = null
        if (i== gym.length){
            
        }
        return gym
    })
    
    console.log(gyms)
    res.render("map", { title: "Map", user: req.user, link:`https://apis.mappls.com/advancedmaps/v1/${process.env.MAP_API_KEY}/map_load?v=1.5`, gyms})
}
