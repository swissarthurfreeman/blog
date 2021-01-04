module.exports = (req, res) => {
    res.render('login', {
        usernameError: '', 
        passwordError: '', 
        usernameE: '', 
        password: ''
    })
}