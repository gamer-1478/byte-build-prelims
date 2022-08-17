const mongoose = require('mongoose'),
    reqString = { type: String, required: true },
    reqBoolean = { type: Boolean, required: true, default: false },
    moment = require('moment'),
    now = new Date(),
    dateStringWithTime = moment(now).format('YYYY-MM-DD HH:MM:SS');


const userSchema = new mongoose.Schema({
    email: reqString,
    username: reqString,
    password: reqString,
    date: {
        type: String,
        default: dateStringWithTime
    },
    userId: reqString,
    admin: reqBoolean,
    ip: reqString,
    confirmed: reqBoolean,
    emailToken: reqString,
})

module.exports = mongoose.model("User", userSchema)
