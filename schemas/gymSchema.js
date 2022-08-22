const mongoose = require('mongoose'),
    reqString = { type: String, required: true },
    notreqString = { type: String, required: false }

const gymSchema = new mongoose.Schema({
    name: reqString,
    location: reqString,

})

module.exports = mongoose.model("Gym", gymSchema)
