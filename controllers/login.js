module.exports = (req, res) => {
    res.render('login', {
        usernameError: req.app.get('usernameError'), 
        passwordError: req.app.get('passwordError'), 
        usernameE: req.body.usernameE, 
        password: req.body.password
    })
}