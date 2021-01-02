/*This function really should be middleware, it acts as such.*/ 
function containsUpperCase(str) {
    for(let i=0; i < str.length; i++) {
        if (!(str[i] == str[i].toLowerCase() && str[i] != str[i].toUpperCase())) {
             return true       
        }
    }
    return false
}

module.exports = (req, res, next) => {
    console.log(req.body.username)
    //hang is used to not use next if there was a problem.
    var hang = false
    let errors = {
        usernameError: "",
        passwordError: "",
        password: req.body.password,
        username: req.body.username
    }
    console.log(req.body.username)
    if(req.body.username.length == 0) {
        hang = true
        errors["usernameError"] = "Please provide a username and password !";
        res.render('register', errors);
    } else if( req.body.password.length < 10 || !(containsUpperCase(req.body.password))) {
        hang = true
        errors["passwordError"] = "Password must be at least 10 characters long and contain an uppercase letter !";
        res.render('register', errors);
    }
    if(!hang) {
        next()
    }
}