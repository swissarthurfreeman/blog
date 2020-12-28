const User = require('../models/User.js')
const path = require('path')

module.exports = (req, res) => {
    //this creates a user document in the users collection.
    User.create(req.body, (error, user) => {
        if(error) {
            console.log(error)
            return res.redirect('/auth/register')
        }
        res.redirect('/')
    })
}