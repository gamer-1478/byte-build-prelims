import dotenv from 'dotenv'
dotenv.config();

//module imports
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import ejs from 'ejs';
import path from 'path'
import session from 'cookie-session'
import passport from 'passport'
import {passportInit} from './utils/passportConfig.js'
import flash from 'express-flash'

import {dirname} from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();

//app middleware
app.set('view engine', 'ejs');
app.use(express.static('public'))
app.use(cors())
app.use(express.json({limit: '50mb'}));       
app.use(express.urlencoded({ extended: true, limit: '50mb'})); 
app.use(express.static(path.join(__dirname,'public')))
//passport middleware
app.use(session({
    secret:process.env.SESSION_SECRET,
    resave:true,
    saveUninitialized:true,
    cookie:{_expires : 86400000}
}));
app.use(flash())

passportInit(passport)

//connect mongodb
import mongoose from 'mongoose';
const dbUri = process.env.MONGO_URI
mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true })

//more passport
app.use(passport.initialize());
app.use(passport.session());

//route imports
import {router as landing} from './routes/landing.js'
import {router as auth} from './routes/auth.js'
import {router as admin} from './routes/admin.js'
//main
app.use('/', landing)
app.use('/auth', auth)
app.use('/admin', admin)


//listen
const PORT = 5000 || process.env.PORT
app.listen(PORT, ()=>{
    console.log(`Server started on port ${PORT}`)
})
