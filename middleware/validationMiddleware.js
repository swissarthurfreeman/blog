/*This middleware is executed before any route 
when creating a new post in the blog. We check
and go through all the possible errors here,
and render the appropriate error messages on user side.*/
module.exports = (req, res, next) => {
    let options = {
        title: req.body.title, 
        subtitle: req.body.subtitle,
        providedText: req.body.body,
        imageError: "",
        titleError: "",
        subtitleError: "",
        createPost: true
    }
    console.log(req.body.title)
    if(req.body.title == "") {
        options["titleError"] = "You must provide a title !";
        res.render('create', options);
    } else if(req.files == "") {
        options["imageError"] = "You must provide a background image !";
        res.render('create', options);
    } else if(req.body.subtitle == "") {
        options["subtitleError"] = "You must provide a subtitle !";
        res.render('create', options);
    } else if( !( (req.files.image.mimetype == "image/jpeg" || req.files.image.mimetype == "image/png") 
    && (req.files.image.size < 10*(10**6) ) ) ) { //size is in MB.
        options["imageError"] = "Supported files are jpg/png smaller than 10 MB";
        res.render('create', options);
    }  
    next()
}