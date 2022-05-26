const mongoose = require('mongoose')

const Schema = mongoose.Schema

const fixtureSchema = new Schema({
    team1:{type:mongoose.Types.ObjectId, required:true,ref:"teams"},
    team2:{type:mongoose.Types.ObjectId, required:true,ref:"teams"},
    time:{type:Date, required:true},
    score:{type:String},
    events:[{type:String}],
    minutes:{type:String},
    status:{type:Boolean}

})

module.exports = mongoose.model('fixture',fixtureSchema)