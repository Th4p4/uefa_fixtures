const db = require("../db");
const Team = require("../model/team");
const Group = require("../model/group");

const shuffleArray = require("../utils/shuffle");
const HttpError = require("../model/http_error");
const team = require("../model/team");

exports.pushTeam = async (req, res, next) => {
  if (!db.database) {
    const error = new HttpError("Seems like your database is empty.", 404);
    return next(error);
  }
  try {
    const shuffledArray = shuffleArray.shuffleArray(db.database);
    // console.log(shuffledArray);
    shuffledArray.forEach(async (element) => {
      const team = new Team({
        name: element,
      });
      await team.save();
    });
  } catch (err) {
    const error = new HttpError(
      "Failed to get create teams to database, Please try again later",
      500
    );
    return next(error);
  }
  res.status(200).json("Succesfully created teams");
};

exports.assignGroup = async (req, res, next) => {
  try {
    let team;
    team = await Team.find();
    const groups = await Group.find();
    team.forEach(async (obj, i) => {
      i < 6 ? (obj.group = groups[0]._id) : (obj.group = groups[1]._id);
      await obj.save();
      // obj.populate('group')
    });
    // console.log(team);
  } catch (err) {
    const error = new HttpError(
      "Failed to assign groups to teams, Please try again later",
      500
    );
    return next(error);
  }
  res.status(200).json("Successfully assigned group to teams.");
};

exports.getTeams = async (req, res, next) => {
  let teams;
  try {
    teams = await Team.find({});
    console.log(teams)
    console.log("hero")
  } catch (err) {
    // throw new HttpError(
    //   "Failed to get teams, Please try again later",
    //   500
    // );
    const error = new HttpError(
      "Failed to get teams, Please try again later",
      500
    );
    return next(error);
  }
  res.status(200).json({teams});
};
