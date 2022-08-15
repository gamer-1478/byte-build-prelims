import User from '../models/userSchema.js'

export async function verify_email(req, res){
    const user = await User.findOne({emailToken: req.params.token})
    if(!user) req.flash('error', 'Invalid token, please try registering again!')
    user.confirmed = true;
    await user.save()
    await req.login(user, async(err)=>{
        if(err) return err;
        res.redirect("/auth/login")
    })
}