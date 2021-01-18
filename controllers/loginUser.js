const bcrypt = require('bcryptjs')
const User = require('../models/User')

module.exports = async (req, res) => {
    const { username, password } = req.body
    
    User.findOne({username:username}, (error, user) => {    
        if ((error) || (!user)) {
            req.app.set('usernameError', 'Username not valid.')
        } else {
            const same = bcrypt.compareSync(password, user.password)
            if(!same) {
                //req.body.passwordError = 'Invalid Password'
                req.app.set('passwordError', 'Password not valid.')
            } else {
                //req.session.userId = user._id
                req.app.set('userId', user._id)
                req.app.set('usernameError', '')
                req.app.set('passwordError', '')
                if(user.username === 'gordon') {
                    gordon = true;
                }
                loggedIn = true;
                console.log('passwords match')
            }
        }
    })
    res.redirect('/auth/login')
}