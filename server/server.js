require('dotenv').config();
const express = require('express');
const massive = require('massive');
const session = require('express-session');
const ctrl = require('./controller/controller')
const bcrypt = require('bcryptjs');

const {SECRET, SERVER_PORT, CONNECTiON_STRING, NODE_ENV} = process.env;

const app = express();
app.use(express.json())
massive(CONNECTiON_STRING).then(db => app.set('db', db))
app.use(session({
    secret: SECRET,
    resave: false,
    saveUninitialized: false
}))

app.use(async  (req, res, next) => {
    if(NODE_ENV === 'development'){
        let db = req.app.get('db')
       let results = await db.find_profile('sayasean@gmail.com')
        req.session.user = {
            id: results[0].profile_id,
            name: results[0].name,
            email: results[0].profile_email,
            bio: results[0].profile_bio,
            image: results[0].profile_image
        }
    } next()
})

app.post('/auth/login', ctrl.login)
app.post('/auth/register', ctrl.register)


app.get('/user_profile', ctrl.getUser)
app.get('/logout', ctrl.logout)
app.get('/games-list', ctrl.getGames)
app.get('/add-games/:id', ctrl.addGames)
app.get('/my-games/:id', ctrl.myGames)
app.get('/get-friends', ctrl.getMatch)

app.delete('/delete/:id', ctrl.deleteGame)

app.put('/edit-profile', ctrl.editProfile)

app.listen(SERVER_PORT, () => console.log(`Welcome ${SERVER_PORT}`))