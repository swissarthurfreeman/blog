const User = require('../models/User')

module.exports = (req, res, next) => {
    User.findById(req.session.userId, (error, user) => {
        //if the user doesn't exist, we redirect back to home page.
        if(error || !user)
            return res.redirect('/')
        next()
    })
}