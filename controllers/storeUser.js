const User = require('../models/User.js')
const path = require('path')

//question: can attackers make requests here if they don't have the path ?
//I think they can, adding a master password to have access to these accounts
//will be necessary.
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