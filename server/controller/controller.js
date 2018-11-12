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
        let { email, password } = req.body;
        let db = req.app.get('db')
        let [foundUser] = await db.find_profile(email);
        if (foundUser) return res.status(200).send({ message: 'Email already in use' })
        let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(password, salt)
        let [createUser] = await db.createUser([email, hash])
        req.session.user = {
            name: foundUser.name,
            email: foundUser.profile_email,
            bio: foundUser.profile_bio
        }
        res.status(200).send({message: 'Logged in.'})
    }   
}