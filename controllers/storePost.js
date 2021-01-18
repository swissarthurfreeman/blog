const BlogPost = require('../models/BlogPost')
const fs = require('fs')
const path = require('path')

module.exports = async (req, res) => {
    let image = req.files.image;

    //compatibility unix/windows, join creates filepath for correct platform.
    let parent = path.dirname(`${__dirname}`);

    //path /usr/src/app/public/uploads/images on volume
    const imgDir = path.join(parent, "public", "uploads", "images")
    
    //create /usr/src/app/uploads/images on volume
    if( !(fs.existsSync(imgDir) )) {
        fs.mkdir(imgDir, (error) => {
            if(error) {
                console.log(`Error cannot create directory : ${imgDir}`)
                console.log(error)
            }
        })
    }

    let pathToImage = path.join(path.join('uploads', 'images'), image.name);

    //move image to /usr/src/app/uploads/images/nameoffile.jpg
    image.mv(path.join(imgDir, image.name), async (error) => {
            //creates a new document with browser data.
            await BlogPost.create({
                title: req.body.title,
                subtitle: req.body.subtitle,
                body: req.body.body,
                image: path.join('/', `${pathToImage}`),
                //will exist because new post only available after having logged in
                //userId gets populated in loginUser.js
                userid: req.session.userId,
                datePosted: new Date()
            })

            if(error) {
                console.log("File moving error :")
                console.log(error)
            }

            //callback is called when create is complete.
            res.redirect('/')    
        }
    )
}