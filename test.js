const mongoose = require('mongoose')
require('dotenv').config()

//we import the model BlogPOst
//BlogPost is a collection in the database. 
const BlogPost = require('./models/BlogPost')

//we connect to the database, if it doesn't exist mongoose will create it
//for us.
mongoose.connect(`mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@` + 
                `${process.env.MONGO_HOST}:${process.env.MONGO_PORT}`, //URI
                {useNewUrlParser:true, useUnifiedTopology:true}, //options
                function(err) {         //error handling
                    if(err) throw err
                    else console.log("Connected to MongoDB")
                });

//this creates a document in our database.
//callback is called after create is done.
/*BlogPost.create({
    title: `This is a second test blogpost`, 
    body: `BRUUUH blaalaélaskgask blaalaélaskgaskblaalaélaskgask
    blaalaélaskgaskblaalaélaskgaskblaalaélaskgaskblaalaélaskgaskblaalaélaskgask
    blaalaélaskgaskblaalaélaskgaskblaalaélaskgaskblaalaélaskgask
    blaalaélaskgaskblaalaélaskgaskblaalaélaskgaskblaalaélaskgaskblaalaélaskgask`,
    date: '24/12/2020'
    }, (error, blogpost) => {
        console.log(error, blogpost);
    } 
)*/

//allows to find a blogpost within blogpost collection, /This/ means This in title.
BlogPost.find({title:/This/}, 
    (error, blogpost) => {
        console.log(error, blogpost);
    }
)

//aussi findById cf. docu find mongoose.