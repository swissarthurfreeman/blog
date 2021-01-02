module.exports = (req, res) => {
    res.render('register', {
        passwordError: "",
        usernameError: "",
        username: "",
        password: ""
    })
}