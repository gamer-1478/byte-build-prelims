const User = require("../schemas/userSchema.js"),
  bcrypt = require("bcrypt"),
  { nanoid } = require("nanoid")

const auth_register_get = (req, res) => {
  res.render("auth/register", { title: "Register" });
};

const auth_register_post = async (req, res) => {
  let errors = [];
  const { name, email, password, confirmPassword } = req.body;

  if (!name || !email || !password) {
    errors.push({ msg: "All fields are required" })
  };
  if (password !== confirmPassword) {
    errors.push({ msg: "Passwords do not match" });
  }
  if (errors.length > 0) {
    res.send(errors);
  } else {

    User.findOne({ email: email }).then((user) => {
      if (user) {
        errors.push({ msg: "User already exists, try logging in instead." })
        return res.send(errors)
      }
      const userId = nanoid();
      const newUser = new User({
        name: name,
        email: email,
        password: password,
        userId: userId,
      });
      bcrypt.genSalt(10, (err, salt) =>
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser.save().then((user) => {
            user = JSON.parse(JSON.stringify(user));
            user.success = true;
            res.send(user)
          }).catch((err) => console.log(err));
        })
      );
    });
  }
};



module.exports = { auth_register_post, auth_register_get };
