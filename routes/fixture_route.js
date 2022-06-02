const express = require('express')
const fixtureController = require('../controller/fixture_controller')
const router = express.Router()
const getGroupTeam = require("../middleware/getGroupTeam.js");

router.patch('/:id',fixtureController.fixtureUpdate)
router.get("/:id", getGroupTeam, fixtureController.createFixture);
router.get('/',fixtureController.getFixtures)

module.exports = router