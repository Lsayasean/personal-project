const bcrypt = require('bcryptjs')

module.exports = {
    async login(req, res) {
        let { email, password } = req.body;
        let db = req.app.get('db')
        let [foundUser] = await db.find_profile(email);
        if (foundUser) {
            let results = bcrypt.compareSync(password, foundUser.profile_pass);
            if (results) {
                req.session.user = {
                    id: foundUser.profile_id,
                    name: foundUser.name,
                    email: foundUser.profile_email,
                    bio: foundUser.profile_bio,
                    image: foundUser.profile_image,
                    backgroundImage: foundUser.background_image
                }
                console.log(req.session.user)
                res.status(200).send({ message: 'Logged in.' })
            } else {
                res.status(401).send({ message: 'Incorrect password.' })
            }
        } else {
            res.status(401).send({ message: 'Email already in use' })
        }
    },
    async register(req, res) {
        let { email, password , name , bio, image, background} = req.body;
        let db = req.app.get('db')
        let [foundUser] = await db.find_profile(email);
        if (foundUser) return res.status(200).send({ message: 'Email already in use' })
        let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(password, salt)
        // console.log(hash.length)
        let [createUser] = await db.create_user([name, hash, email, bio, image, background])
        req.session.user = {
            id: createUser.profile_id,
            name: createUser.name,
            email: createUser.profile_email,
            bio: createUser.profile_bio,
            image: createUser.profile_image,
            backgroundImage: createUser.background_image
        }
        res.status(200).send({message: 'Logged in.'})
    },
    async getUser(req,res) {
        if(req.session.user){
            res.status(200).send(req.session.user)
        } else {
            res.sendStatus(401)
        }
    },
    logout(req, res) {
        req.session.destroy();
        res.redirect('http://localhost:3000')
    },
    async getGames(req, res) {
        let db = req.app.get('db')
       let results =  await db.game_list()
       res.status(200).send(results)
    },
    async addGames(req, res) {
        let db = req.app.get('db')
        let gameId = req.params.id
        let userId = req.session.user.id;
        let results = await db.add_game_list(gameId, userId)
        res.status(200).send(results)

    },
    async myGames(req, res) {
        let db = req.app.get('db')
        let id = req.params.id
        let results = await db.owned_list(id)
        res.status(200).send(results)
    },
    async deleteGame(req, res) {
        let db = req.app.get('db')
        let id = req.params.id
        let userId = req.session.user.id
        db.delete_game(id)
        let results = await db.owned_list(userId)
        res.status(200).send(results)
    },
    async editProfile(req, res) {
        let {name, image, bio, background} = req.body;
        let db = req.app.get('db')
        let userId = req.session.user.id;
        let results = db.edit_user_info([name, bio, image, userId, background])
        res.status(200).send(results)
    },
    async getMatch(req, res) {
        let db = req.app.get('db')
        let userId = req.session.user.id
        let results = await db.match_people(userId)
        res.status(200).send(results)

    },
    async message(req, res){
        let {message, name} = req.body;
        let db = req.app.get('db')
        let results = db.create_mes([name,message])
        res.status(200).send(results)
    },
    async getMessages(req, res){
        let db = req.app.get('db')
        let results = await db.get_messages()
        res.status(200).send(results)
    }
}