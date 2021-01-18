module.exports = (req, res) => {
    console.log(req.body.passwordError)
    res.render('login', {
        usernameError: req.app.get('usernameError'), 
        passwordError: req.app.get('passwordError'), 
        usernameE: req.body.usernameE, 
        password: req.body.password
    })
}