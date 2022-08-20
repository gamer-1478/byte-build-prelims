const User = require("../schemas/userSchema.js"),
  bcrypt = require("bcrypt"),
  { nanoid } = require("nanoid"),
  crypto = require("crypto"),
  nodemailer = require('nodemailer');

const auth_register_get = (req, res) => {
  res.render("auth/register", { title: "Login" });
};

const auth_register_post = async (req, res) => {
  let errors = [];
  const { username, email, password, confirmPassword, token } = req.body;

  if (!username || !email || !password) {
    errors.push({ msg: "All fields are required" })
  };
  if (password !== confirmPassword) {
    errors.push({ msg: "Passwords do not match" });
  }
  if (errors.length > 0) {
    return res.send(errors);
  }

  User.findOne({ email: email }).then((user) => {
    if (!user) {
      const userId = nanoid();
      const emailToken = crypto.randomBytes(64).toString("hex");
      const newUser = new User({
        username: username,
        email: email,
        password: password,
        userId: userId,
        emailToken: emailToken,
        admin: true,
      });
      bcrypt.genSalt(10, (err, salt) =>
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser.save().then((user) => {
            sendMail(email, emailToken, req)
          }).catch((err) => console.log(err));
        })
      );
    }

    errors.push({ msg: "User already exists, try logging in instead." });
    res.render("auth/register", {
      errors,
      title: "Register",
      description: "Register",
    });
  });
};

const sendMail = async (email, emailToken, req) => {
  const message = {
    from: "yash.madaan@ais.amity.edu",
    to: email,
    subject: "Intech App email confirmation",
    text: `Thank you for registering your account.
                      Please verify your account by clicking the link below
                      http://${req.headers.host}/auth/email-confirmation/${emailToken}
                      `,
    html: `
                        <h1>Thank you for registering your account.</h1>
                        <h2>Please verify your account by clicking <a href="http://${req.headers.host}/auth/email-confirmation/${emailToken}">here</a></h2>
                        
                      `
  }
  try {
    const transporter = nodemailer.createTransport({
      service: 'hotmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS
      }
    })
    transporter.sendMail(message, function (err, info) {
      if (err) {
        console.log(err)
        return;
      }
      console.log(info.response)
    })
    req.flash('success', 'Registration Successful, please verify your email.')
    res.render("auth/login", { title: "Register Successful" });
  } catch {
    req.flash('error', 'Something went wrong, please try again.')
  }
}

module.exports = { auth_register_post, auth_register_get };
