const dashboard = async (req, res) => {
    res.render("dashboard", {title: "Dashboard", user:req.user})
}

module.exports = {
    dashboard
};

