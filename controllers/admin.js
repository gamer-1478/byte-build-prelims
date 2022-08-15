import User from '../models/userSchema.js'
import {nanoid} from 'nanoid'

export const admin = async (req, res)=>{
    res.render("admin/admin", {title: "admin", user:req.user})
}

