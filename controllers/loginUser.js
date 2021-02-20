const bcrypt = require('bcryptjs')
const User = require('../models/User')

module.exports = async (req, res) => {
    const { username, password } = req.body
    
    User.findOne({ username:username }, (error, user) => {    
        if ((error) || (!user)) {
            req.app.set('usernameError', 'Username not valid.')
        } else {
            //console.log(username, password);
            //console.log(user.password);
            const same = bcrypt.compareSync(password, user.password);
            if(!same) {
                loggedIn = false;
                req.app.set('passwordError', 'Password not valid.')
            } else {
                
                //req.app.set('userId', user._id)
                req.app.set('usernameError', '')
                req.app.set('passwordError', '')
                if(user.username === 'gordon') {
                    gordon = true;
                }
                req.session.userId = user._id;
                //need to call save for modification of session object to be
                //passed into next requests following redirect. (or else it won't show up).
                req.session.save((err) => {
                    console.log(err)
                })
                //loggedIn will be set to false in middleware in index.js
                loggedIn = true;
                
            }
        }
    })
    res.redirect('/auth/login')
}