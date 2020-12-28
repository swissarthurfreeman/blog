const express = require('express')
const ejs = require('ejs')
require('dotenv').config()
const { appendFile } = require('fs')
//npm i mongoose afin de rajouter mongoose
const mongoose = require('mongoose')

const bodyParser = require('body-parser')

const newPostController = require('./controllers/newPost')
const homeController = require('./controllers/home')
const storePostController = require('./controllers/storePost')
const getPostController = require('./controllers/getPost')
const newUserController = require('./controllers/newUser')
const storeUserController = require('./controllers/storeUser')
const loginController = require('./controllers/login')
const loginUserController = require('./controllers/loginUser')

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

const validateMiddleWare = require('./middleware/validationMiddleware')

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

app.get('/', homeController)
app.get('/post/:id', getPostController)
app.get('/posts/new', newPostController)
app.post('/posts/store', storePostController)
app.get('/auth/register', newUserController)
app.post('/users/register', storeUserController)
app.get('/auth/login', loginController)
app.post('/users/login', loginUserController)

//Issues : 
/*
Dates are fucked up.
*/