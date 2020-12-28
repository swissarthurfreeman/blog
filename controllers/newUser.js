module.exports = (req, res) => {
    let username = ""
    let password = ""

    const data = req.flash('data')[0]

    //si on avait déjà entré des données avant
    if(typeof data != "undefined") {
        //on ne les abandonne pas.
        username = data.username
        password = data.password
    }

    res.render('register', {
        errors: req.flash('validationErrors'),
        //on les remets dans les inputs, si data est undefined
        //ces champs seront vides.
        username: username,
        password: password
    })
}