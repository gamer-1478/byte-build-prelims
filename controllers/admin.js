const User = require('../schemas/userSchema.js'),
    { nanoid } = require('nanoid');

module.exports = admin = async (req, res) => {
    res.render("admin/admin", { title: "admin", user: req.user })
}