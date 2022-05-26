const express = require('express')
const router = express.Router()
const group_controller = require('../controller/group_controller.js')
const getGroupTeam = require('../middleware/getGroupTeam.js')

router.get('/',group_controller.createGroup)
router.get('/:id',getGroupTeam,group_controller.getGroupTeams)
router.put('/:id',group_controller.updateGroup)
router.get('/fixture/:id',getGroupTeam,group_controller.createfixtureFromGroups)


module.exports = router