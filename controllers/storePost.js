const BlogPost = require('../models/BlogPost')
const fs = require('fs')
const path = require('path')

module.exports = async (req, res) => {
    let image = req.files.image;

    //compatibility unix/windows, join creates filepath for correct platform.
    const imgDir = path.join("uploads", "images");  
    console.log(imgDir)
    if( !(fs.existsSync(imgDir) )) {
        fs.mkdir(imgDir, (error) => {
            if(error) {
                console.log(`Error cannot create directory : ${imgDir}`)
            }
        })
    }

    console.log(image)
    image.mv(path.join(imgDir, image.name), 
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