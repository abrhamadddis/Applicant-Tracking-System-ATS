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
    
    const { company, logo, isnew, featured, position, role, level, postedAt, contract, location, languages, tools  } = req.body

    if(!company){
       return res.status(400).json({message: "add text"})

        // throw new Error('plase add missing information')
    }
     else{

        const goal = await Goal.create({
            company,
            logo,
            isnew,
            featured,
            position,
            role,
            level,
            postedAt,
            contract,
            location,
            languages,
            tools
        })
        return res.status(200).json(goal)
     }

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
    
    goal.company = req.body.company || goal.company;
    goal.logo = req.body.logo || goal.logo;
    goal.isnew = req.body.isnew || goal.isnew;
    goal.featured = req.body.featured || goal.featured;
    goal.position = req.body.position || goal.position;
    goal.role = req.body.role || goal.role;
    goal.level = req.body.level || goal.level;
    goal.postedAt = req.body.postedAt || goal.postedAt;
    goal.contract = req.body.contract || goal.contract;
    goal.location = req.body.location || goal.location;
    goal.languages = req.body.languages || goal.languages;
    goal.tools = req.body.tools || goal.tools;
    
    const updateGoal = await goal.save();


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
    
    await Goal.findByIdAndRemove(req.params.id);
    res.status(200).json({id: req.params.id})
})

module.exports = {
    getGoals, setGoal, updateGoal, delateGoal
}