const BlogPost = require('../models/BlogPost')

module.exports = async (req, res) => {
    console.log(req.params.id)
    const blogpost = await BlogPost.findById(req.params.id).populate('userid')
    console.log(blogpost)
    res.render('post', {
        blogpost
    })
}