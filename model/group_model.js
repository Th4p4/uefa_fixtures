const mongoose = require('mongoose')

const Schema = mongoose.Schema

const groupSchema = new Schema({
    name:{type:String, required:true},
    teams:[{ type: mongoose.Types.ObjectId, required: true,ref:"Team"}]
})

module.exports = mongoose.model("Groups",groupSchema)