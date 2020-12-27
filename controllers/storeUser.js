const User = require('../models/User.js')
const path = require('path')

module.exports = (req, res) => {
    //this creates a user document in the users collection.
    User.create(req.body, (error, user) => {
        res.redirect('/')
    })
}