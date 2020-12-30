const express = require('express')
const ejs = require('ejs')
require('dotenv').config()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const expressSession = require('express-session')
const flash = require('connect-flash')
const newPostController = require('./controllers/newPost')
const homeController = require('./controllers/home')
const storePostController = require('./controllers/storePost')
const getPostController = require('./controllers/getPost')
const newUserController = require('./controllers/newUser')
const storeUserController = require('./controllers/storeUser')
const loginController = require('./controllers/login')
const loginUserController = require('./controllers/loginUser')
const logoutController = require('./controllers/logout')

//will be accessible to all ejs files.
global.loggedIn = null; 

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

//register expressSession middleware with configuration
//object with secret key. Secret is used to sign and
//encrypt the session ID cookie shared with the browser.
app.use(expressSession({
    secret: 'gordon-freeman'
}))

//allows to erase messages received at last
//request cycle (error messages for instance)
//all requests will have a req.flash() function
//used to flash messages.
app.use(flash())

//adds the req.body property, all req.body.* properties
//will depend on the entries we have in the form
//from the which the request has been made. (cf. create.ejs)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

const validateMiddleWare = require('./middleware/validationMiddleware')
const authMiddleware = require('./middleware/authMiddleware')
const redirectIfAuthenticatedMiddleware = require('./middleware/redirectIfAuthenticatedMiddleware') 
const logout = require('./controllers/logout')

app.use('/posts/store', validateMiddleWare)

//pipeline from left to right, authMiddleware is first called,
//then newPostController before anything done at /posts/new
//                  check session id, check not undefined
app.use('/posts/new', authMiddleware, newPostController)

//on all requests this middleware will be executed.
app.use('*', (req, res, next) => {
    loggedIn = req.session.userId;
    next()
})


//will make it that any file ending with .ejs
//will be rendered using ejs package. (res.render)
app.set('view engine', 'ejs')

mongoose.connect(`mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@` + 
                `${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DATABASE}`, //URI
                {useNewUrlParser:true, useUnifiedTopology:true}, //options
                function(err) {         //error handling
                    if(err) {
                        console.log(process.env.MONGO_HOST)
                        throw err
                    }
                    else console.log("Connected to MongoDB")
                });
  
app.listen(4000, () => {
    console.log('App listening on port 4000')
})

app.get('/', homeController)
app.get('/post/:id', getPostController)
app.get('/posts/new', newPostController)
//app.post('/posts/store', authMiddleware, newPostController)
app.post('/posts/store', storePostController)
app.get('/auth/register', redirectIfAuthenticatedMiddleware, newUserController)
app.post('/users/register', redirectIfAuthenticatedMiddleware, storeUserController)
app.get('/auth/login', redirectIfAuthenticatedMiddleware, loginController)
app.post('/users/login', redirectIfAuthenticatedMiddleware, loginUserController)
app.get('/auth/logout', logoutController)

//if after having checked all routes, we haven't sent anything
//it means it ain't defined, so we render notfound.
app.use((req, res) => res.render('notfound'))

//Issues : 
/*
Dates are fucked up.
*/