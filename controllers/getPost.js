const BlogPost = require('../models/BlogPost')

module.exports = async (req, res) => {
    const blogpost = await BlogPost.findById(req.params.id, (err) => {
        if(err) {
            console.log(err)
        }
    }).populate('userid')
    
    console.log(`GET ID: ${req.params.id}`)
    res.render('post', {blogpost: blogpost})
}