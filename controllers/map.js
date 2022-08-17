require("dotenv").config()

module.exports = map = (req, res)=>{
    res.render("map", {title: "Map", link:`https://apis.mappls.com/advancedmaps/v1/${process.env.MAP_API_KEY}/map_load?v=1.5`})
}
