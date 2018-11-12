require('dotenv').config();
const express = require('express');
const massive = require('massive');
const session = require('session')

const {SECRET, SERVER_PORT, CONNECTiON_STRING} = process.env;

const app = express();
app.use(express.json())
massive(CONNECTiON_STRING).then(db => app.set('db', db))



app.listen(SERVER_PORT, () => console.log(`Welcome ${SERVER_PORT}`))