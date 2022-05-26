const express = require('express')
const router = express.Router()
const team_controller = require('../controller/team_controller.js')


// router.get('/',controller.getUserData)
// router.post('/signup',controller.signUp)
// router.post('/login',controller.login)

// router.use(checkAuth)
// router.post('/add',controller.addUsers)
// router.get('/random',random_controller.randomTeams)
router.put('/pushTeam',team_controller.pushTeam)
router.get('/getTeams',team_controller.getTeams)
router.put('/assign',team_controller.assignGroup)


module.exports = router