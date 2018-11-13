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
                    name: foundUser.name,
                    email: foundUser.profile_email,
                    bio: foundUser.profile_bio
                }
                res.status(200).send({ message: 'Logged in.' })
            } else {
                res.status(401).send({ message: 'Incorrect password.' })
            }
        } else {
            res.status(401).send({ message: 'Email already in use' })
        }
    },
    async register(req, res) {
        let { email, password , name , bio} = req.body;
        let db = req.app.get('db')
        let [foundUser] = await db.find_profile(email);
        if (foundUser) return res.status(200).send({ message: 'Email already in use' })
        let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(password, salt)
        console.log(hash.length)
        let [createUser] = await db.create_user([name, hash, email, bio])
        req.session.user = {
            name: createUser.name,
            email: createUser.profile_email,
            bio: createUser.profile_bio
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
    }
}