const express = require('express')
const router = express.Router()
const {getGoals, setGoal, updateGoal, delateGoal} = require('../controllers/goalController')


router.route('/').get(getGoals).post(setGoal)

router.route('/:id').put(updateGoal).delete(delateGoal)



module.exports = router