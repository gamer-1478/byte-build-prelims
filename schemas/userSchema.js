const mongoose = require('mongoose'),
    reqString = { type: String, required: true },
    reqBoolean = { type: Boolean, required: true, default: false },
    moment = require('moment'),
    now = new Date(),
    dateStringWithTime = moment(now).format('YYYY-MM-DD HH:MM:SS');


const userSchema = new mongoose.Schema({
    email: reqString,
    name: reqString,
    password: reqString,
    date: {
        type: String,
        default: dateStringWithTime
    },
    userId: reqString,
    admin: reqBoolean,
    creds: {type: Number, default: 10000}
})

module.exports = mongoose.model("User", userSchema)
