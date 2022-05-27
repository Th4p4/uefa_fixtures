const mongoose = require('mongoose')

const Schema = mongoose.Schema

const fixtureSchema = new Schema({
    team1:{type:mongoose.Types.ObjectId, required:true,ref:"teams"},
    team2:{type:mongoose.Types.ObjectId, required:true,ref:"teams"},
    home_match:{type:String, required:true},
    away_match:{type:String, required:true},
    time:{type:Date},
    score:{type:String},
    events:[{type:String}],
    minutes:{type:String},
    status:{type:Boolean}

})

module.exports = mongoose.model('fixture',fixtureSchema)