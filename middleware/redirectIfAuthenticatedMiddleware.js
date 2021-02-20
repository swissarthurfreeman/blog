module.exports = (req, res, next) => {
    //this should be executed if and only if userId has been set.
    console.log("session object : ", req.session)
    if( req.session.userId ) {
        loggedIn = true;
        return res.redirect('/')
    }
    next()
}