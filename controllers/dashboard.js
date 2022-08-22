
module.exports = dashboard = async (req, res) => {
    res.render("dashboard", { title: "admin", user: req.user })
}
