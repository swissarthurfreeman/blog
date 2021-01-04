//Issues / ToDo : 
/*
Issues : 
For some reason navbar no longer is usable when on contact page.
Logging in returns error but works, must fix res.render and res.redirect
having them both in one async function is not appreciated by node js environment...
To finish :
9) Figure out way to include images in blogposts. (easy with img tag from summernote)
16) Add database to keep track of visitors (logging their ips.)
*/

/***************************************************/
/*                   IMPORTS                       */
/***************************************************/
const express = require('express')
const ejs = require('ejs')
require('dotenv').config()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const expressSession = require('express-session')
const fileUpload = require('express-fileupload')

const app = new express()

//will be accessible to all ejs files.
global.loggedIn = null; 
global.gordon = false;

/***************************************************/
/*        USER DEFINED MIDDLEWARE FUNCTIONS        */
/***************************************************/
const validateMiddleWare = require('./middleware/validationMiddleware')
const authMiddleware = require('./middleware/authMiddleware')
const redirectIfAuthenticatedMiddleware = require('./middleware/redirectIfAuthenticatedMiddleware') 


/***************************************************/
/*          MIDDLEWARE STACK DECLARATION           */
/***************************************************/
/*
Middleware functions are functions that have access to the 
request object, the response object and the next middleware
function in the application request-response cycle.

app.use is like a root except that it'll be executed regardless
of the http request type.

http://expressjs.com/en/5x/api.html#app.use
http://expressjs.com/en/guide/using-middleware.html

expres.static('public') will transform any request url into
/public/req.url (this is executed everytime the app receives a request.)
*/
app.use(express.static('public'))
app.use(express.static('uploads'))

/*
This middleware allows to upload files. It will add the req.files
property to the req object. Say we upload car.jpg in a form, and
the field name is foo <input name="foo", type="file" />, then 
in express we'll be able to access at a post route req.files.foo.
More details on what req.files.foo looks like : 

https://www.npmjs.com/package/express-fileupload

fileUpload() depends on busybody, we can add options, like limits and size / type.
busybody is a module for parsing incoming HTML form data.
*/ 
app.use(fileUpload({
    limits: { 
        fileSize: 10*(10**6), //10 Megabytes (this value is in bytes.)
        fieldNameSize: 100 //100 characters maximum.
    }
}))

//register expressSession middleware with configuration
//object with secret key. Secret is used to sign and
//encrypt the session ID cookie shared with the browser.
app.use(expressSession({
    secret: 'gordon-freeman'
}))

//adds the req.body property, all req.body.* properties
//will depend on the entries we have in the form
//from the which the request has been made. (cf. create.ejs)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

const newPostController = require('./controllers/newPost')
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

/***************************************************/
/*                   CONTROLLERS                   */
/***************************************************/
const logout = require('./controllers/logout')
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
const getRegisterController = require('./controllers/getRegisterController')
const sendEmailMiddleware = require('./middleware/sendEmailMiddleware')
const sendEmailController = require('./controllers/sendEmail') 

/***************************************************/
/*              DATABASE CONNECTION                */
/***************************************************/
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

//create admin user.
const User = require('./models/User')
User.create({username: 'gordon', password:`${process.env.GORDON_PASSWORD}`}, (error) => {})

/***************************************************/
/*                    ROUTES                       */
/***************************************************/
app.get('/', homeController)
app.get('/post/:id', getPostController)
app.get('/posts/new', newPostController)
app.post('/posts/store', storePostController)

app.get('/auth/register', getRegisterController)
app.post('/users/register', newUserController, storeUserController)

app.get('/auth/login', redirectIfAuthenticatedMiddleware, loginController)
app.post('/users/login', redirectIfAuthenticatedMiddleware, loginUserController)
app.get('/auth/logout', logoutController)
app.get('/pages/about', getAboutController)


app.get('/pages/contact', getContactController)
app.post('/pages/contact', sendEmailMiddleware, sendEmailController)

//if after having checked all routes, we haven't sent anything
//it means it ain't defined, so we render notfound.
app.use((req, res) => res.render('notfound'))