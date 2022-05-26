const db = require("../db");
const Team = require("../model/team_model");
const Group = require("../model/group_model");

const shuffleArray = require('../utils/shuffle')



// exports.randomTeams = (req, res, next) => {
//   try {
//     const shuffledArray = shuffleArray(db.database);
//     console.log(shuffledArray, "random bhitra");
//     res.status(200).json(shuffledArray);
//   } catch (error) {
//     res.send("error");
//   }
// };

exports.pushTeam = async (req, res, next) => {
  try {
    // console.log(shuffledArray);
    const shuffledArray = shuffleArray.shuffleArray(db.database)
    console.log(shuffledArray)
    shuffledArray.forEach(async (element) => {
      const team = new Team({
        name: element,
        // group: "poleA",
      });
      await team.save();
      
    });
  } catch (error) {
    console.log(error,'helllo')
    res.json(error);
  }
  res.status(200).json("done");
  
};

exports.assignGroup = async (req, res, next) => {
 
  try {
    let team
    team = await Team.find();
    const groups = await Group.find()
    team.forEach(async (obj, i) => {
      i < 6 ? (obj.group = groups[0]._id) : (obj.group = groups[1]._id);
      await obj.save();
      // obj.populate('group')
    });
    // console.log(team);
   
  
  } catch (error) {
    console.log(error)
    res.json("error");
  }
  res.json('done')
};

exports.getTeams =async (req,res,next)=>{
  let teams;
  try {
    teams = await Team.find({})
  } catch (error) {
    res.send('error occured')
  }
  res.status(200).json(teams)
}





