const User = require('../models/User.js')
const path = require('path')

module.exports = (req, res) => {
    //this creates a user document in the users collection.
    User.create(req.body, (error, user) => {
        if(error) {
            console.log(error)
            //extract individual error messages of error.
            //now error.errors is an array of message errors. (which was added)
            const validationErrors = Object.keys(error.errors).map(key => error.errors[key].message);
            req.flash('validationErrors', validationErrors)
            req.flash('data', req.body)
            return res.redirect('/auth/register')
        }
        res.redirect('/')
    })
}