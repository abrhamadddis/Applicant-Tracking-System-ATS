const  asyncHandler = require('express-async-handler')

// @desc Get goals
// @route GET  /api/goal
// @access private
const getGoals = asyncHandler(async(req, res) => {
    res.status(200).json({ message : 'Get goals' })
})

// @desc set goals
// @route POST /api/goals
// @access private
const setGoal = asyncHandler(async(req, res) => {
    if(!req.body.text){
        res.status(400)
        throw new Error('please add a text field')
    }
    res.status(200).json({message: 'get goals'})
})

// @desc updating goals
// @route PUT /api/goals/id
// @access private
const updateGoal =asyncHandler(async(req, res) => {
    res.status(200).json({message: `update goal ${req.params.id}`})
})

// @desc delate goals
// @route delate /api/goals/id
// @access private
const delateGoal = asyncHandler(async(req, res) => {
    res.status(200).json({message: `update goal ${req.params.id}`})
})

module.exports = {
    getGoals, setGoal, updateGoal, delateGoal
}