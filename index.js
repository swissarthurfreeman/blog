const express = require('express')
const path = require('path')
const ejs = require('ejs')
require('dotenv').config()
const { appendFile } = require('fs')
//npm i mongoose afin de rajouter mongoose
const mongoose = require('mongoose')
const { restart } = require('nodemon')

const bodyParser = require('body-parser')
const BlogPost = require('./models/BlogPost')

const newPostController = require('./controllers/newPost')

//adds the "files" property ot the req object of post route callbacks.
//we can access any uploaded file using req.files.
const fileUpload = require('express-fileupload')

const app = new express()
//autocompletes any request into /public, including
//for html files, whenever they link to another file, say CSS
//they'll go look for it in public.
app.use(express.static('public'))
//we register the package in Express with app.use
//that way we'll have req.files available.
app.use(fileUpload())

//adds the req.body property, all req.body.* properties
//will depend on the entries we have in the form
//from the which the request has been made. (cf. create.ejs)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

//app.use registers middleware to use with express
//middleware is code that'll be executed before a
//request is processed by an express route.
//this can allow us to filter out invalid requests
//validateMiddleWare will check wether one of the inputs
//is empty and if so redirects back to posts, this avoids
//errors when trying to read null.title and that way we don't
//create empty ghost posts.
const validateMiddleWare = (req, res, next) => {
    if(req.files == null || req.body.title == null || req.body.title == null) {
        return res.redirect('/posts/new')
    }
    next()
}

app.use('/posts/store', validateMiddleWare)

//will make it that any file ending with .ejs
//will be rendered using ejs package. (res.render)
app.set('view engine', 'ejs')

mongoose.connect(`mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@` + 
                `${process.env.MONGO_HOST}:${process.env.MONGO_PORT}`, //URI
                {useNewUrlParser:true, useUnifiedTopology:true}, //options
                function(err) {         //error handling
                    if(err) throw err
                    else console.log("Connected to MongoDB")
                });
  
app.listen(4000, () => {
    console.log('App listening on port 4000')
})

app.get('/', async (req, res) => {
    //res.render automatically looks for files in views.
    const blogposts = await BlogPost.find({})
    //with this index.ejs now has access to blogposts variable.
    //console.log(blogposts)
    res.render('index', {
        blogposts
    });
})

app.get('/about', (req, res) => {
    res.render('about');
})

app.get('/contact', (req, res) => {
    res.render('contact');
})

app.get('/post/:id', async (req, res) => {
    console.log(req.params.id)
    const blogpost = await BlogPost.findById(req.params.id)
    res.render('post', {
        blogpost
    })
})


app.get('/posts/new', newPostController)

app.post('/posts/store', async (req, res) => {
    console.log(req.body)
    let image = req.files.image;
    //console.log(image)
    image.mv(path.resolve(__dirname, 'public/img', image.name), 
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
})