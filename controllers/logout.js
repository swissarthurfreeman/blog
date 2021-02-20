module.exports = (req, res) => {
    //destroy destroys all session data including user id.
    loggedIn = false;
    req.app.set('userId', undefined)
    req.session.destroy(() => {
        res.redirect('/')
    })
}