const BlogPost = require('../models/BlogPost')

module.exports = async (req, res) => {
    
    req.app.set('usernameError', '')
    req.app.set('passwordError', '')
    
    //res.render automatically looks for files in views.
    const blogposts = await BlogPost.find({}).populate('userid');
    //with this index.ejs now has access to blogposts variable.
    //console.log(blogposts)
    //console.log(blogposts)
    res.render('index', {
        blogposts,
        emailSent: false,
        emailNotSent : false
    });
}