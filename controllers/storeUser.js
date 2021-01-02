const User = require('../models/User.js')
const path = require('path')

module.exports = (req, res) => {
    //this creates a user document in the users collection.
    User.create(req.body, (error, user) => {
        if(error) {
            console.log(error)
            console.log("HERE")
            
            let errors = {
                usernameError: "Username already in use !",
                passwordError: "",
                password: req.body.password,
                username: req.body.username
            }
            return res.render('register', errors);
        } else {
            res.redirect('/');
        }
    })
}