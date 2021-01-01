const BlogPost = require('../models/BlogPost')
const path = require('path')

module.exports = async (req, res) => {
    console.log("HELLOOOO")
    console.log(req.body)

    let image = req.files.image;
    console.log(image)
    
    if (image.mimetype == "image/jpeg" || image.mimetype == "image/png" || image.size > 10) {
        image.mv(path.resolve(__dirname, '..', 'public/img', image.name), 
            async (error) => {
                //creates a new document with browser data.
                await BlogPost.create({
                    title: req.body.title,
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
    } else if(!image) {
        console.log("WERE HEREEEE")
        res.render('create', {
            title: req.body.title, 
            providedText: req.body.body,
            imageError: "You must provide a background image !",
            createPost: true
        })
    } else {
        console.log("That's not a supported format !\n")
        res.render('create', {
            title: req.body.title, 
            providedText: req.body.body,
            imageError: "Supported formats are png/jpg with maximum size of 10MB.",
            createPost: true
        }) 
    }
}