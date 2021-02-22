module.exports = (req, res, next) => {
    //this should be executed if and only if userId has been set.
    console.log("session object : ", req.session)
    if( req.session.userId ) {
        loggedIn = true;
        return res.redirect('/')
    }
    next()
}

//problem : Only gordon should be able to create new user.
//but we get redirected when authentificated when creating
//one, because we use this middleware, gotta create a new
//one for this purpose, but I'll do this later.