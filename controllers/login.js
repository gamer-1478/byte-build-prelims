import User from '../models/userSchema.js'
import passport from 'passport'

const auth_login_get = (req, res) =>{
    res.render('auth/login', { title: "Login"})
}

const auth_login_post = (req, res, next) =>{
    User.findOne({email: req.body.email}).then(user=>{
        if(!user) res.send("Account does not exists")
        else{
            if(user.confirmed){
                passport.authenticate('local', {
                    successRedirect: '/dashboard',
                    failureRedirect: '/auth/login',
                    failureFlash:true
                })(req, res, next);
            }else{
                res.send('Email not confirmed!');
            }
        }
    })
} 

export {auth_login_get, auth_login_post}