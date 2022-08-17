module.exports = const dashboard = async (req, res)=>{
    res.render("dashboard", {title: "Dashboard", user:req.user})
}

