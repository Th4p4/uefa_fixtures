const mongoose = require('mongoose')
const Schema = mongoose.Schema

const imageSchema = new Schema({
    orgImage:{type:String, required:true},
    thumbnail:{type:String, required:true}
})

module.exports = mongoose.model("image",imageSchema)