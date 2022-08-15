import mongoose from 'mongoose';
const reqString = { type:String, required:true }
const reqBoolean = {type: Boolean, required:true, default:false}
import moment from 'moment'
let now = new Date()
let dateStringWithTime = moment(now).format('YYYY-MM-DD HH:MM:SS');


const userSchema = new mongoose.Schema({
    email:reqString, 
    username:reqString,
    password:reqString,
    date: {
        type:String,
        default: dateStringWithTime
    },
    userId: reqString,
    admin: reqBoolean,
    ip: reqString,
    confirmed: reqBoolean,
    emailToken: reqString,
})

export default mongoose.model("User", userSchema)
