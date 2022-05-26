const Team = require('../model/team_model')
const ObjectId = require('mongodb').ObjectID;

module.exports = async (req,res,next)=>{
    try {
      const id = req.params.id
      const team = await Team.aggregate([
        {
          '$match': {
            'group': new ObjectId(id)
          }
        }
      ])
      req.team = team
      next()
      
    } catch (error) {
      console.log(error)
      res.json('error')
    }
  
  }