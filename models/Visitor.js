const mongoose = require('mongoose')

const Schema = mongoose.Schema

const VisitorSchema = new Schema({
    date: String,
    ip: String,
    where: String
})

const Visitor = mongoose.model('Visitor', VisitorSchema)

module.exports = Visitor;