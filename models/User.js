const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs')
let uniqueValidator = require('mongoose-unique-validator')

//by default mongo will create a collection
//for every new schema.
const userSchema = new Schema({
    username: { 
        //mongoose options
        type: String,
        required: [true, 'Please Provide Username'], //ensures this path cannot be set to null, 
        unique: true //checks in database if not present.
    }, 
    password: {
        type: String,
        required: [true, 'Please Provide Password']
    }
}); //we can specify collection name is Schema constructor.

//makes it that duplicate entries show up as
//errors instead of crashing mongo.
userSchema.plugin(uniqueValidator)

//we tell mongoose before we save anything we execute the
//following function.
userSchema.pre('save', function(next) {
    const user = this //this refers to userSchema.
    //callback is called when hashing completes
    bcrypt.hash(user.password, 10, (error, hash) => {
        user.password = hash //replaces original password with encrypted version.
        next()
    })
})

//when we export this mongoose automatically creates
//the corresponding collection in the database.
const User = mongoose.model('User', userSchema)
module.exports = User