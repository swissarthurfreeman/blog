module.exports = (req, res) => {
    //destroy destroys all session data including user id.
    req.app.set('userId', undefined)
    req.session.destroy(() => {
        res.redirect('/')
    })
}