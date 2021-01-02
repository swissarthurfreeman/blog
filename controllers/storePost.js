const BlogPost = require('../models/BlogPost')
const path = require('path')

module.exports = async (req, res) => {
    let image = req.files.image;
    //console.log(image)
    console.log(image) 
    image.mv(path.resolve(__dirname, '..', 'public/img', image.name), 
        async (error) => {
            //creates a new document with browser data.
            await BlogPost.create({
                title: req.body.title,
                subtitle: req.body.subtitle,
                body: req.body.body,
                image: '/img/' + image.name,
                //will exist because new post only available after having logged in
                //userId gets populated in loginUser.js
                userid: req.session.userId  
            })

            if(error)
                console.log(error)

            //callback is called when create is complete.
            res.redirect('/')    
        }
    )
}