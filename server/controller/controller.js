const bcrypt = require('bcryptjs')

module.exports = {
    login(req, res) {
        let {email, password} = req.body;
        let db = req.app.get('db')

    }
}