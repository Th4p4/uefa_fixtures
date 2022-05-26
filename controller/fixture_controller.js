const Fixture = require("../model/fixture_model");

exports.fixtureUpdate = async (req, res, next) => {
  const id = req.params.id;
  const { t1_score, t2_score, events, minutes, status } = req.body;
  try {
    const fixture_instance = await Fixture.findOne({ _id: id });
    if (fixture_instance) {
      status
        ? (fixture_instance.minutes = `${minutes}'`)
        : (fixture_instance.minutes = `90+ET`);
      fixture_instance.status = status;
      fixture_instance.score = `${t1_score}-${t2_score}`;
      if (events) fixture_instance.events.push(events);
      await fixture_instance.save();
    } else {
      res.send("Fixture not found");
    }
    res.send("done");
  } catch (error) {
    console.log(error);
    res.send("error");
  }
};
