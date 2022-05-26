const Group = require("../model/group_model");
const { shuffleArray } = require("../utils/shuffle");
const Fixture = require("../model/fixture_model");


exports.createGroup = async (req,res,next)=>{
    try {
      const groupA = new Group({
        name: "poleA",
      });
      const groupB = new Group({
        name: "poleB",
      });
      await groupA.save();
      await groupB.save();
      res.status(200).json({groupA:groupA,groupB:groupB})
    } catch (error) {
      res.send('error')
    }
  }

  exports.updateGroup = async (req,res,next)=>{
    const id = req.params.id
    console.log(id)
    const {name} = req.body
    try {
      
      const group = await Group.findOne({_id:id})
      group.name = name
      await group.save()
      res.status(200).json('updated')
    } catch (error) {
      res.send('error')
    }
  }

  exports.getGroupTeams = async(req,res,next)=>{
      try {
          res.json(req.team)
      } catch (error) {
          res.send(error)
      }
  }

  exports.fixture = async (req,res,next)=>{
      const team = req.team
      const fixture = []
      console.log(team)
      try {
          if(team){
          for (let i=0;i<team.length;i++){
              for (let j = i+1;j<team.length;j++){
                const game_instance = `${team[i].name} vs ${team[j].name}`
                const createFixture = new Fixture({
                  team1:team[i]._id,
                  team2:team[j]._id
                })
                await createFixture.save()
                fixture.push(game_instance)
              }
          }
          
          }
         res.json(shuffleArray(fixture)) 
      } catch (error) {
        console.log(error)
          res.send('error')
      }
  }

//   }};

  

