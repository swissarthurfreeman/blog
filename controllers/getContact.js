module.exports = async (req, res) => {
    res.render('contact', {
        name: req.body.name,
        nameError: "",
        email: req.body.email,
        emailError: "",
        number: req.body.number,
        numberError: "",
        message: req.body.message,
        messageError: ""
    })
}