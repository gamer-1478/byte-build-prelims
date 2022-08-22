const mongoose = require('mongoose'),
    reqString = { type: String, required: true },
    notreqString = { type: String, required: false }
    moment = require('moment'),
    now = new Date(),
    dateStringWithTime = moment(now).format('YYYY-MM-DD HH:MM:SS');

const gymSchema = new mongoose.Schema({
    name: reqString,
    location: reqString,
<<<<<<< HEAD
    website: reqString,
    email: reqString,
    gymLeader: reqString,
    image: reqString,
    createdAt: {type: String, default: dateStringWithTime}
=======
    type_gym: reqString
>>>>>>> bf4c51df158ca01c2517053ccd3cb771180f4575
})

module.exports = mongoose.model("Gym", gymSchema)
