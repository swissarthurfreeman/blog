const BlogPost = require('../models/BlogPost')

module.exports = async (req, res) => {
    //res.render automatically looks for files in views.
    const blogposts = await BlogPost.find({})
    //with this index.ejs now has access to blogposts variable.
    //console.log(blogposts)
    res.render('index', {
        blogposts
    });
}