

//app.use registers middleware to use with express
//middleware is code that'll be executed before a
//request is processed by an express route.
//this can allow us to filter out invalid requests
//validateMiddleWare will check wether one of the inputs
//is empty and if so redirects back to posts, this avoids
//errors when trying to read null.title and that way we don't
//create empty ghost posts.
module.exports = (req, res, next) => {
    if(req.files == null || req.body.title == null || req.body.title == null) {
        return res.redirect('/posts/new')
    }
    next()
}