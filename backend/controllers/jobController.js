const  asyncHandler = require('express-async-handler')

const Job = require('../models/jobModel');
const { query } = require('express');

// @desc Get jobs
// @route GET  /api/jobs
// @access private

const getJobs = asyncHandler(async(req, res) => {
    const page = req.query.p;
    const filterCriteria = req.query.c;
    const filterValue = req.query.cv
    const jobPerPage = 3;


    if(!page && !filterCriteria && !filterValue){
        const jobs = await Job.find() 
        res.status(200).json({jobs})
    }else if(!page && filterCriteria && filterValue){
        const query = {[filterCriteria]: filterValue};

        const jobs = await Job.find(query)
        res.status(200).json({jobs, filterCriteria: filterCriteria})
    }
    else if(page && !filterCriteria && !filterValue){
        const jobs = await Job.find()
        .sort()
        .skip(page * jobPerPage)
        .limit(jobPerPage)
        
        res.status(200).json({jobs,  currentPage: page})
    }else{ 
        const query = {[filterCriteria]: filterValue};
        
        const jobs = await Job.find(query)
        .sort() 
        .skip(page * jobPerPage)
        .limit(jobPerPage)
        res.status(200).json({jobs, currentPage: page, filterCriteria: filterCriteria})
    }
     
     
    
    


    // res.status(200).json({jobs, currentPage: page})
})

// @desc set jobs
// @route POST /api/jobs
// @access private
const setJob = asyncHandler(async(req, res) => {
    
    const { company, logo, isnew, featured, position, role, level, postedAt, contract, location, languages, tools  } = req.body

    if(!company){
       return res.status(400).json({message: "add text"})

        // throw new Error('plase add missing information')
    }
     else{

        const job = await Job.create({
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
        return res.status(200).json(job)
     }

})

// @desc updating jobs
// @route PUT /api/jobs/id
// @access private
const updateJob =asyncHandler(async(req, res) => {
    const job = await Job.findById(req.params.id)
    if(!job) {
        res.status(400)
        throw new Error('job not found')
    }
    
    job.company = req.body.company || job.company;
    job.logo = req.body.logo || job.logo;
    job.isnew = req.body.isnew || job.isnew;
    job.featured = req.body.featured || job.featured;
    job.position = req.body.position || job.position;
    job.role = req.body.role || job.role;
    job.level = req.body.level || job.level;
    job.postedAt = req.body.postedAt || job.postedAt;
    job.contract = req.body.contract || job.contract;
    job.location = req.body.location || job.location;
    job.languages = req.body.languages || job.languages;
    job.tools = req.body.tools || job.tools;
    
    const updateGoal = await job.save();


    res.status(200).json(updateGoal)
})

// @desc delate jobs
// @route delate /api/jobs/id
// @access private
const delateJob = asyncHandler(async(req, res) => {
    const job = await Job.findById(req.params.id)
    if(!job) {
        res.status(400)
        throw new Error('job not found')
    }
    
    await Job.findByIdAndRemove(req.params.id);

    res.status(200).json({id: req.params.id})
})

module.exports = {
    getJobs, setJob, updateJob, delateJob
}