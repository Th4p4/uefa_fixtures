const Fixture = require("../model/fixture");
const HttpError = require("../model/http_error");

exports.fixtureUpdate = async (req, res, next) => {
  const id = req.params.id;
  const { t1_score, t2_score, events, minutes, status,time } = req.body;
  try {
    const fixture_instance = await Fixture.findOne({ _id: id });
    if (fixture_instance) {
      status
        ? (fixture_instance.minutes = `${minutes}'`)
        : (fixture_instance.minutes = `90+ET`);
      fixture_instance.status = status;
      fixture_instance.score = `${t1_score}-${t2_score}`;
      if (events) fixture_instance.events.push(events);
      fixture_instance.time = new Date(time)
      await fixture_instance.save();
    } else {
      const error = new HttpError("Couldn't find fixture with the given id.",404);
      return next(error)
    }
  } catch (err) {
    const error = new HttpError("Updating fixture failed. Please try again later",500)
    return next(error)
  }
  res.status(200).json("Successfully updated fixture.")
};
