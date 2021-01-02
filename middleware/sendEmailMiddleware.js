module.exports = (req, res, next) => {
    let options = {
        name: req.body.name,
        nameError: "",
        email: req.body.email,
        emailError: "",
        number: req.body.number,
        numberError: "",
        message: req.body.message,
        messageError: ""
    }

    if(req.body.name == "") {
        options["nameError"] = "Please provide a name !";
        return res.render('contact', options);
    } else if(req.body.email == "") {
        options["nameError"] = "Please provide an email !";
        return res.render('contact', options);
    } else if(req.body.number == "") {
        options["numberError"] = "Please provide a number !";
        return res.render('contact', options);
    } else if(req.body.message == "") {
        options["messageError"] = "Please provide a message !";
        return res.render('contact', options);
    }
    next()
}