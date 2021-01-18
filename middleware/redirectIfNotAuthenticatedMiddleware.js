module.exports = (req, res, next) => {
    //app.userId is set when we login, in loginUser.js
    if( (!req.session.userId) || (!req.app.get('userId')) ) {
        return res.redirect('/')
    }
    next()
}