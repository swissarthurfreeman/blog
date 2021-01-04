const bcrypt = require('bcryptjs')
const User = require('../models/User')

module.exports = (req, res) => {
    const { username, password } = req.body
    //they're supposed to be unique anyway.
    //we find the user by username
    User.findOne({username:username}, (error, user) => {
        let passwordError = ''
        let usernameError = ''
        if(user) { //if he exists
            //we compare passwords
            same = bcrypt.compareSync(password, user.password)
            if(same) { //if we good
                console.log("Password do match for user ", user.username)
                //assigns _id to the session. req.session is provided 
                //by expressSession middleware. It saves _id on the user's browser
                //so that at each request, this cookie will be sent back to the server
                //with the _id. That way we know if user is logged in or not.
                req.session.userId = user._id
                if(user.username === 'gordon') {
                    gordon = true
                } else {
                    gordon = false
                }
                res.redirect('/')
            } else { 
                console.log("Passwords do not match.");
                passwordError = 'Invalid Password';
            }
        } else {
            usernameError = 'Username not valid.';
        } 
        console.log(usernameError)
        res.render('login', {
            usernameError: usernameError, 
            passwordError: passwordError,
            usernameE: req.body.username,
            password: req.body.password
        }) 
    })
}