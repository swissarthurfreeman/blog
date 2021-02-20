/*Contains the controller hanling the request from
user to create a new blog post.*/

module.exports = (req, res) => {
    if(req.session.userId) {
        loggedIn = true;        
        return res.render('create', {
            createPost: true,
            title: "",
            subtitle: "",
            providedText: "",
            imageError: "",
            titleError: "",
            subtitleError: ""
        })
    }
    res.redirect('/auth/login')
}