module.exports = (req, res, next) => {
    if( (req.session.userId) || (req.app.get('userId')) ) {
        req.session.userId = req.app.get('userId')
        return res.redirect('/')
    }
    next()
}