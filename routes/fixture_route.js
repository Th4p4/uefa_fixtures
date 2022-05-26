const express = require('express')
const { fixtureUpdate } = require('../controller/fixture_controller')
const router = express.Router()

router.patch('/:id',fixtureUpdate)

module.exports = router