const Group = require("../model/group");
const { shuffleArray } = require("../utils/shuffle");
const Fixture = require("../model/fixture");
const HttpError = require("../model/http_error");
const Date = require("../model/date");

exports.createGroup = async (req, res, next) => {
  try {
    const groupA = new Group({
      name: "A",
    });
    const groupB = new Group({
      name: "B",
    });
    await groupA.save();
    await groupB.save();
    res.status(200).json({ groupA: groupA, groupB: groupB });
  } catch (err) {
    const error = new HttpError(
      "Creation of group failed, Please try again later",
      500
    );
    return next(error);
  }
  res.status(201).json("Groups Created Successfully");
};

exports.updateGroup = async (req, res, next) => {
  const id = req.params.id;
  const { name } = req.body;
  if (!id || !name) {
    const error = new HttpError("Id or name seems to be missing", 409);
    return next(error);
  }
  try {
    const group = await Group.findOne({ _id: id });
    group.name = name;
    await group.save();
  } catch (err) {
    const error = new HttpError(
      "Updating group failed, Please try again later.",
      500
    );
    return next(error);
  }
  res.status(200).json("updated");
};

exports.getGroupTeams = async (req, res, next) => {
  try {
    res.status(200).json({ teams: req.team });
  } catch (err) {
    const error = new HttpError(
      "Failed to get group teams, Please try again later",
      500
    );
    return next(error);
  }
};



// exports.check =(req,res,next)=>{
//   const date = new Date()
//   date.addDays(4)
//   console.log(date)
//   res.json('hi')

// }

// exports.cgr = setTimeout(async (req, res, next) => {
//   const team = req.team;
//   const fixture = [];
//   console.log(team);
//   try {
//     if (team) {
//       for (let i = 0; i < team.length; i++) {
//         for (let j = i + 1; j < team.length; j++) {
//           const game_instance = `${team[i].name} vs ${team[j].name}`;
//           const createFixture = new Fixture({
//             team1: team[i]._id,
//             team2: team[j]._id,
//           });
//           await createFixture.save();
//           fixture.push(game_instance);
//         }
//       }
//     }
//   } catch (err) {
//     const error = new HttpError("Failed to create fixtures, Please try again later",500)
//     return next(error)
//   }
//   res.status(201).json({fixtures:fixture})

// }, 10000);

//   }};
