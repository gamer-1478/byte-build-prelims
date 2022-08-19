const User = require("../models/userSchema.js"),
  bcrypt = require("bcrypt"),
  { nanoid } = require("nanoid")

const auth_register_get = (req, res) => {
  res.render("auth/register", { title: "Register" });
};

const auth_register_post = async (req, res) => {
  let errors = [];
  const { username, email, password, confirmPassword } = req.body;

  if (!username || !email || !password) {
    errors.push({ msg: "All fields are required" })
  };
  if (password !== confirmPassword) {
    errors.push({ msg: "Passwords do not match" });
  }
  if (errors.length > 0) {
    res.render("register", { errors, title: "Register", description: "Register" })
  }else{

  User.findOne({ email: email }).then((user) => {
    if (user) {
      errors.push({ msg: "User already exists, try logging in instead." })
      res.render("auth/register", { errors, title: "Register", description: "Register" })
    }else{
      console.log("test")
      const userId = nanoid();
      const newUser = new User({
        username: username,
        email: email,
        password: password,
        userId: userId,
      });
      bcrypt.genSalt(10, (err, salt) =>
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser.save().then((user) => {
            // console.log(user)
            res.redirect("/auth/login")
          }).catch((err) => console.log(err));
        })
      );
    }});
}};



module.exports = { auth_register_post, auth_register_get };
