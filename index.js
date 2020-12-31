//Issues / ToDo : 
/*
0) Reorganise code and remove comments index.js (they're kept in previous commits.)
1) Dates are fucked up.
2) Fix html tags appearing in subtitle of post
3) Add subtitle field to post schema, in order not to have
whole article in subtitle.
4) Add contact form with re-captcha authentification.
5) Remove new user button, only gordon or approved users this
ain't a public forum.
6) find way to change background to black.
7) Repair image upload system, on image for header sure,
8) but we need to store them in a volume, not in /img
or else they will be deleted if volume is deleted.
9) Figure out way to include images in blogposts.
10) No need for error handling with express image upload
since users won't be able of uploading stuff.
11) redirect gordon post link to about.
12) Gordon's blog link (top left) must redirect to home.
13) See how database transfering works
14) See how you can transfer collections from one database to a new one
15) See how to backup periodically all posts.
*/

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
const getAboutController = require('./controllers/getAbout')
const getContactController = require('./controllers/getContact')

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

//morale ne jamais mettre /database_name sinon l'authentification foire.
//laisser tourner dans tests temporairement.
mongoose.connect(`mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@` + 
                `${process.env.MONGO_HOST}:${process.env.MONGO_PORT}`, //URI
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
app.get('/pages/about', getAboutController)
app.get('/pages/contact', getContactController)

//if after having checked all routes, we haven't sent anything
//it means it ain't defined, so we render notfound.
app.use((req, res) => res.render('notfound'))