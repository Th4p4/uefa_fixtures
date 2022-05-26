const express = require('express')
const router = express.Router()
const grp_router = require('./group_route')
const team_router = require('./team_router')
const fixture_router = require('./fixture_route')
const image_router = require('./image_route')


router.use('/groups',grp_router)
router.use('/teams',team_router)
router.use('/fixture',fixture_router)
router.use('/image',image_router)


module.exports = router


