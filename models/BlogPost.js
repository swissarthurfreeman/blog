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
    body: String,
    username: String,
    datePosted: {
        type: Date,
        default: new Date()
    }, 
    image: String
});

const BlogPost = mongoose.model('BlogPost', BlogPostSchema);

module.exports = BlogPost;