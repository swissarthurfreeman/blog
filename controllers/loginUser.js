const bcrypt = require('bcryptjs')
const User = require('../models/User')

module.exports = (req, res) => {
    const { username, password } = req.body
    //they're supposed to be unique anyway.
    //we find the user by username
    User.findOne({username:username}, (error, user) => {
        if(user) { //if he exists
            //we compare passwords
            bcrypt.compare(password, user.password, (error, same) => {
                if(same) { //if we good
                    console.log("Password do match for user ", user.username)
                    res.redirect('/')
                } else { //if not
                    console.log("Passwords do not match.")
                    res.redirect('/auth/login')
                }
            })
        } else { //if user doesn't exist.
            console.log(error)
            res.redirect('/auth/login')
        }
    })
}