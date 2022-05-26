const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const teamSchema = new Schema({
  name: { type: String, required: true },
  group: { type: mongoose.Types.ObjectId, ref: "Groups" },
});

module.exports = mongoose.model("Team",teamSchema)
