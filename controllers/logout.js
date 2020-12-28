module.exports = (req, res) => {
    //destroy destroys all session data including user id.
    req.session.destroy(() => {
        res.redirect('/')
    })
}