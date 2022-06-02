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

exports.createFixture = async (req, res, next) => {
  const team = req.team;
  console.log(team)
  const startDate = new Date(2022, 06, 28);
  const endDate = new Date(2022, 07, 20);
  const fixture = [];
  // console.log(team);
  try {
    if (team) {
      let count = 0;
      let home_match = new Date(+startDate);
      let away_match = new Date(+startDate);
      away_match = away_match.addDays(5);
      for (let i = 0; i < team.length; i++) {
        for (let j = i + 1; j < team.length; j++) {
          if (count == 2) {
            count = 0;
            home_match = home_match.addDays(1);
            away_match = away_match.addDays(1);
          }
          console.log("here", count);
          console.log(home_match.addHours(5), away_match);
          const game_instance = `${team[i].name} vs ${team[j].name}`;
          const createFixture = new Fixture({
            team1: team[i]._id,
            team2: team[j]._id,
            home_match: home_match.addHours(5),
            away_match: away_match.addHours(5),
          });
          await createFixture.save();
          fixture.push(game_instance);
          count += 1;
        }
      }
    }

  } catch (err) {
    console.log(err);
    const error = new HttpError(
      "Failed to create fixtures, Please try again later",
      500
    );
    return next(error);
  }
  res.status(201).json({ fixtures: fixture });
};

exports.getFixtures = async (req,res,next)=>{
  try {
    const teamFixtures = await Fixture.find()
    res.status(200).json({fixtures:teamFixtures})
  } catch (err) {
    console.log(err)
    const error = new HttpError(
      "Failed to Get fixtures, Please try again later",
      500
    );
    return next(error);
  }
  
}
