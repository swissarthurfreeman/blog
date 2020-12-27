const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs')

//by default mongo will create a collection
//for every new schema.
const userSchema = new Schema({
    username: String,
    password: String
}); //we can specify collection name is Schema constructor.

//we tell mongoose before we save anything we execute the
//following function.
userSchema.pre('save', function(next) {
    const user = this //this refers to userSchema.
    bcrypt.hash(user.password, 10, (error, hash) => {
        user.password = hash
        next()
    })
})

const User = mongoose.model('User', userSchema)
module.exports = User