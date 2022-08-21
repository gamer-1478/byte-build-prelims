module.exports = landing = (req, res)=>{
    res.render("landing", {title: "Home", user: req.user})
}
