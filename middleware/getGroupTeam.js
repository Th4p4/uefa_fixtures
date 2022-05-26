const Group = require("../model/group");
const HttpError = require("../model/http_error");
const Team = require("../model/team");
const ObjectId = require("mongodb").ObjectID;

module.exports = async (req, res, next) => {
  const id = req.params.id;
  try {
    const group = await Group.findOne({ _id: id });
  } catch (err) {
    const error = new HttpError("Couldn't find group with the given id.", 404);
    return next(error);
  }
  try {
    const team = await Team.aggregate([
      {
        $match: {
          group: new ObjectId(id),
        },
      },
    ]);
    req.team = team;
    next();
  } catch (error) {
    const err = new HttpError(
      "Failed to get group teams, Please try again later",
      500
    );
    return next(err);
  }
};
