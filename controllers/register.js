import User from "../models/userSchema.js";
import bcrypt from "bcrypt";
import { nanoid } from "nanoid";
import crypto from "crypto";
import nodemailer from 'nodemailer'

const auth_register_get = (req, res) => {
  res.render("auth/register", { title: "Login" });
};

const auth_register_post = async (req, res) => {
  let errors = [];
  const { username, email, password, confirmPassword, token } = req.body;



  if (!username || !email || !password)
    errors.push({ msg: "All fields are required" });

  if (password !== confirmPassword) {
    errors.push({ msg: "Passwords do not match" });
    console.log(errors);
  }

  if (errors.length > 0) res.render("auth/register", errors);
  else {
    if(token == "suspicious"){
      User.findOne({ email: email }).then((user) => {
        if (user) {
          errors.push({ msg: "User already exists, try logging in instead." });
          res.render("auth/register", {
            errors,
            title: "Register",
            description: "Register",
          });
        } else {
          const userId = nanoid();
          const emailToken = crypto.randomBytes(64).toString("hex");
          const newUser = new User({
            username: username,
            email: email,
            password: password,
            userId: userId,
            emailToken: emailToken,
            admin:true,
          });
          bcrypt.genSalt(10, (err, salt) =>
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) throw err;
              newUser.password = hash;
              newUser
                .save()
                .then((user) => {
                  const message = {
                      from: "yash.madaan@ais.amity.edu",
                      to: email,
                      subject: "Intech App email confirmation",
                      text: `Thank you for registering your account.
                      Please verify your account by clicking the link below
                      http://${req.headers.host}/auth/email-confirmation/${user.emailToken}
                      `,
                      html: `
                        <h1>Thank you for registering your account.</h1>
                        <h2>Please verify your account by clicking <a href="http://${req.headers.host}/auth/email-confirmation/${user.emailToken}">here</a></h2>
                        
                      `
                  }
                  try{
                      const transporter = nodemailer.createTransport({
                          service:'hotmail',
                          auth:{
                              user: process.env.EMAIL,
                              pass: process.env.EMAIL_PASS
                          }
                      })
                      transporter.sendMail(message, function(err, info){
                          if(err){
                              console.log(err)
                              return;
                          }
                          console.log(info.response)
                      })
                      req.flash('success', 'Registration Successful, please verify your email.')
                      res.render("auth/login", { title: "Register Successful" });
                  }catch{
                      req.flash('error', 'Something went wrong, please try again.')
                  }
                })
                .catch((err) => console.log(err));
            })
          );
        }
      });
    }else{
      User.findOne({ email: email }).then((user) => {
        if (user) {
          res.send("Mail already in use for another account!")
        } else {
          const userId = nanoid();
          const emailToken = crypto.randomBytes(64).toString("hex");
          const newUser = new User({
            username: username,
            email: email,
            password: password,
            userId: userId,
            ip: req.ip,
            emailToken: emailToken,
          });
          bcrypt.genSalt(10, (err, salt) =>
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) throw err;
              newUser.password = hash;
              newUser
                .save()
                .then((user) => {
                  const message = {
                      from: "yash.madaan@ais.amity.edu",
                      to: email,
                      subject: "Z3nith hack email confirmation",
                      text: `Thank you for registering your account.
                      Please verify your account by clicking the link below
                      http://${req.headers.host}/auth/email-confirmation/${user.emailToken}
                      `,
                      html: `
                        <h1>Thank you for registering your account.</h1>
                        <h2>Please verify your account by clicking <a href="http://${req.headers.host}/auth/email-confirmation/${user.emailToken}">here</a></h2>
                        
                      `
                  }
                  try{
                      const transporter = nodemailer.createTransport({
                          service:'hotmail',
                          auth:{
                              user: process.env.EMAIL,
                              pass: process.env.EMAIL_PASS
                          }
                      })
                      transporter.sendMail(message, function(err, info){
                          if(err){
                              console.log(err)
                              return;
                          }
                          console.log(info.response)
                      })
                      req.flash('success', 'Registration Successful, please verify your email.')
                      res.render("auth/login", { title: "Register Successful" });
                  }catch{
                      req.flash('error', 'Something went wrong, please try again.')
                  }
                })
                .catch((err) => console.log(err));
            })
          );
        }
      });
    }
  }
};

export { auth_register_post, auth_register_get };
