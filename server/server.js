require('dotenv').config();
const express = require('express');
const massive = require('massive');
const session = require('express-session');
const ctrl = require('./controller/controller')
const socket = require('socket.io')

const {SECRET, SERVER_PORT, CONNECTiON_STRING, NODE_ENV} = process.env;

const app = express();
app.use(express.json())
app.use( express.static( `${__dirname}/../build` ) );
massive(CONNECTiON_STRING).then(db => app.set('db', db))
app.use(session({
    secret: SECRET,
    resave: false,
    saveUninitialized: false
}))

// app.use(async  (req, res, next) => {
//     if(NODE_ENV === 'development'){
//         let db = req.app.get('db')
//        let results = await db.find_profile('sayasean@gmail.com')
//         req.session.user = {
//             id: results[0].profile_id,
//             name: results[0].name,
//             email: results[0].profile_email,
//             bio: results[0].profile_bio,
//             image: results[0].profile_image,
//             backgroundImage: results[0].background_image
//         }
//     } next()
// })

app.post('/auth/login', ctrl.login)
app.post('/auth/register', ctrl.register)
app.post('/messages', ctrl.message)
app.post('/add-game', ctrl.addGame)


app.get('/user_profile', ctrl.getUser)
app.get('/logout', ctrl.logout)
app.get('/games-list', ctrl.getGames)
app.get('/add-games/:id', ctrl.addGames)
app.get('/my-games/:id', ctrl.myGames)
app.get('/get-friends', ctrl.getMatch)
app.get('/get-messages', ctrl.getMessages)

app.delete('/delete/:id', ctrl.deleteGame)

app.put('/edit-profile', ctrl.editProfile)

const io = socket(app.listen(SERVER_PORT, () => console.log(`Welcome ${SERVER_PORT}`)))

io.on('connection', (socket) => {
    console.log(socket.id);

    socket.on('SEND_MESSAGE', function(data){
        io.emit('RECEIVE_MESSAGE', data)
        console.log(data)
    })
});