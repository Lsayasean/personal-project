require('dotenv').config();
const express = require('express');
const massive = require('massive');
const session = require('express-session');
const ctrl = require('./controller/controller')
const bcrypt = require('bcryptjs');

const {SECRET, SERVER_PORT, CONNECTiON_STRING} = process.env;

const app = express();
app.use(express.json())
massive(CONNECTiON_STRING).then(db => app.set('db', db))
app.use(session({
    secret: SECRET,
    resave: false,
    saveUninitialized: false
}))

app.post('/auth/login', ctrl.login)



app.listen(SERVER_PORT, () => console.log(`Welcome ${SERVER_PORT}`))