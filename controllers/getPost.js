const BlogPost = require('../models/BlogPost')

module.exports = async (req, res) => {
    console.log(req.params.id)
    const blogpost = await BlogPost.findById(req.params.id, (err) => {
        if(err) {
            console.log(err)
        }
    })
    
    blogpost.populate('userid')
    
    console.log(`GET ID: ${req.params.id}`)

    console.log(blogpost)

    res.render('post', {blogpost})
}