const mongoose = require("mongoose")
const Schema = mongoose.Schema

let articleSchema = new Schema({
    title : String,
    description: String,
    author: String,
    content : String,
    tags: String,
    created_at: Date,
    image: String,
    userId : {
        type: Schema.Types.ObjectId,
        ref: 'user'
    }
})

let Article = mongoose.model('article',articleSchema)

module.exports = Article
