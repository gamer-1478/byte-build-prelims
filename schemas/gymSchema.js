const mongoose = require('mongoose'),
    reqString = { type: String, required: true },
    notreqString = { type: String, required: false }
    moment = require('moment'),
    now = new Date(),
    dateStringWithTime = moment(now).format('YYYY-MM-DD HH:MM:SS');

const gymSchema = new mongoose.Schema({
    name: reqString,
    location: reqString,
    website: reqString,
    email: reqString,
    gymLeader: reqString,
    image: reqString,
    createdAt: {type: String, default: dateStringWithTime}
})

module.exports = mongoose.model("Gym", gymSchema)
