require('dotenv').config()

//modules 
const express = require('express'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    ejs = require('ejs'),
    path = require('path'),
    session = require('cookie-session'),
    passport = require('passport'),
    passportInit = require('./utils/passportConfig.js'),
    flash = require('express-flash'),
    mongoose = require('mongoose');

//routes
const landing = require('./routes/landing.js'),
    auth = require('./routes/auth.js'),
    admin = require('./routes/admin.js');
    map = require('./routes/map.js');

const app = express(),
    PORT = 5000 || process.env.PORT;


//app middleware
app.set('view engine', 'ejs')
app.use(express.static('public'), express.json({ limit: '1mb' }), express.urlencoded({ extended: true, limit: '1mb' }), flash())
app.use('/', express.static('public'))

//passport middleware
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: { _expires: 86400000 }
}))

passportInit(passport)

//connect mongodb
const dbUri = process.env.MONGO_URI
mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true })

//more passport
app.use(passport.initialize())
app.use(passport.session())

//main
app.get('/test', (req, res) => {
    req.flash('success', 'test')
    res.send(req.flash())
})
app.use('/', landing)
app.use('/auth', auth)
app.use('/admin', admin)
app.use('/map', map)


app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
})
