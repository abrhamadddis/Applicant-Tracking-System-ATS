const  asyncHandler = require('express-async-handler')

const Job = require('../models/jobModel');
const { query } = require('express');
const moment  = require('moment')
const Joi = require('joi');

// @desc Get jobs
// @route GET  /api/jobs
// @access private

const getJobs = asyncHandler(async(req, res) => {
    let {page, limit, company, position, location, sort} = req.query
    limit = Number(limit)
    page = Number(page)
    const skip = (page - 1) * limit
    const filterJob = {}
    let query;


    
    if(company){
        filterJob.company = company;
    } if(position){
        filterJob.position = position;
    } if(location) {
        filterJob.location = location;
    }

    query = Job.find(filterJob)
    console.log(query)
    const dateCreated = query.postedAt;
    const formatPostedAt = moment(dateCreated).fromNow()
    query.postedAt = formatPostedAt


    if(sort === "company"){
        query.sort({company: 1});
    } if(sort === "position") {
        query.sort({position: 1});
    } if (sort === "location"){
        query.sort({location: 1});
    }
    
    const job = await query.skip(skip).limit(Number(limit));
    let totalJobs = await Job.countDocuments(filterJob);
    const totalPages = Math.ceil(totalJobs / limit)
        
        res.status(200).json({job, currentPage: page, totalPages: totalPages,})
})

// @desc get job
// @route POST /api/job
// @route privee

const getJob = asyncHandler(async(req, res) => {
    const job = await Job.findById(req.params.id)
    const dateCreated = job.postedAt;
    const formatPostedAt = moment(dateCreated).fromNow()
    
    job.postedAt = formatPostedAt

    if(!job) {
        res.status(400)
        throw new Error('job not found')
    }
    res.status(200).json(job) 

})

// @desc set jobs
// @route POST /api/jobs
// @access private
const setJob = asyncHandler(async (req, res) => {
    const { company, logo, isnew, featured, position, role, level, contract, location, languages, tools } = req.body;
    const postedAt = new Date();
  
    const jobValidationSchema = Joi.object({
      company: Joi.string().required(),
      logo: Joi.string(),
      isnew: Joi.boolean(),
      featured: Joi.boolean(),
      position: Joi.string(),
      role: Joi.string(),
      level: Joi.string(),
      contract: Joi.string(),
      location: Joi.string(),
      languages: Joi.array().items(Joi.string()),
      tools: Joi.array().items(Joi.string()),
    });
  
    try {
      await jobValidationSchema.validateAsync(req.body);
  
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
        tools,
      });
  
      return res.status(200).json(job);
    } catch (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
  });

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
    getJobs, getJob, setJob, updateJob, delateJob
}