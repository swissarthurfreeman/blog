/*Contains the controller hanling the request from
user to create a new blog post.*/

module.exports = (req, res) => {
    if(req.session.userId) {
        return res.render('create')
    }
    res.redirect('/auth/login')
}