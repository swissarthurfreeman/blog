//a model is an object that represents collections
//in our database. A collection is an entity e-commerce : category, users...
//which contains documents. A document is an instance of an entity containing
//fields which are key value pairs. 
const mongoose = require('mongoose')

//Reminder : mongooose is a MONGODB object modeling tool.

//a schema represents what a collection looks like
const Schema = mongoose.Schema

//the collection here is a blog post
const BlogPostSchema = new Schema({
    title: String,
    subtitle: String,
    body: String,
    //username: String,
    userid : {
        //specifies a valid objectId. Mong ohas a specific id for each document
        //and they must be in a valid format.
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', //refers to the user collection.
        required: true
    },
    datePosted: Date, 
    image: String
});

const BlogPost = mongoose.model('BlogPost', BlogPostSchema);

module.exports = BlogPost;