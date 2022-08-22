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
    expressLayouts = require('express-ejs-layouts'),
    mongoose = require('mongoose');

//routes
const landing = require('./routes/landing.js'),
    auth = require('./routes/auth.js'),
    admin = require('./routes/admin.js'),
    map = require('./routes/map.js'),
    cart = require('./routes/cart.js'),
    store = require('./routes/store.js'),
    gym = require('./routes/gyms.js'),
    checkout = require('./routes/checkout.js'),
    orders = require('./routes/orders.js'),
    dashboard = require('./routes/dashboard.js'),
    pokemon = require('./routes/pokemon.js');
    dashboard = require('./routes/dashboard.js');
    pokedex = require('./routes/pokedex.js');

const app = express(),
    PORT = process.env.PORT || 5000;

//app middleware
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.json({ limit: '1mb' }), express.urlencoded({ extended: true, limit: '1mb' }))
app.use(flash())
app.use(expressLayouts)
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
mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true }).then(console.log("Connected to mongodb"))

//more passport
app.use(passport.initialize())
app.use(passport.session())

//main
app.use('/', landing) //done
app.use('/auth', auth) //domne
app.use('/admin', admin) //add pages
app.use('/map', map) //done
app.use('/store', store) //done
app.use('/gym', gym) //add individual pages
app.use('/cart', cart) //done
app.use('/checkout', checkout) //done
app.use('/orders', orders)
app.use('/dashboard', dashboard)
app.use('/pokemon', pokemon)
app.use('/dashboard', dashboard)
app.use('/pokedex', pokedex)

app.get('/404', (req, res) => {
    res.render('404')
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
})