const  asyncHandler = require('express-async-handler')

const Goal = require('../models/goalModel')

// @desc Get goals
// @route GET  /api/goal
// @access private
const getGoals = asyncHandler(async(req, res) => {
    const goals = await Goal.find()

    res.status(200).json(goals)
})

// @desc set goals
// @route POST /api/goals
// @access private
const setGoal = asyncHandler(async(req, res) => {
    if(!req.body.text){
        res.status(400)
        throw new Error('please add a text field')
    }
    const goal = await Goal.create({
        text: req.body.text,
    })
    res.status(200).json(goal)
})

// @desc updating goals
// @route PUT /api/goals/id
// @access private
const updateGoal =asyncHandler(async(req, res) => {
    const goal = await Goal.findById(req.params.id)
    if(!goal) {
        res.status(400)
        throw new Error('goal not found')
    }

    const updateGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {new: true,})

    res.status(200).json(updateGoal)
})

// @desc delate goals
// @route delate /api/goals/id
// @access private
const delateGoal = asyncHandler(async(req, res) => {
    const goal = await Goal.findById(req.params.id)
    if(!goal) {
        res.status(400)
        throw new Error('goal not found')
    }
        await goal.remove()
    res.status(200).json({id: req.params.id})
})

module.exports = {
    getGoals, setGoal, updateGoal, delateGoal
}