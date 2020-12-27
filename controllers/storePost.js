const BlogPost = require('../models/BlogPost')
const path = require('path')

module.exports = async (req, res) => {
    console.log(req.body)
    let image = req.files.image;
    //console.log(image)
    image.mv(path.resolve(__dirname, '..', 'public/img', image.name), 
        async (error) => {
            //creates a new document with browser data.
            await BlogPost.create({
                title: req.body.title,
                body: req.body.body,
                image: '/img/' + image.name
            })
                
            //callback is called when create is complete.
            res.redirect('/')    
        }
    )
}