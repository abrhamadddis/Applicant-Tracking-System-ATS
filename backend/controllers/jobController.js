const  asyncHandler = require('express-async-handler')

const Job = require('../models/jobModel');
const { query } = require('express');
const Joi = require('joi');
const mongoose = require('mongoose')

// @desc Get jobs
// @route GET  /api/jobs
// @access private

const getJobs = asyncHandler(async(req, res) => {
    let {page, limit, company, position, location, sort} = req.query
    console.log(req.query)
    limit = Number(limit)
    page = Number(page)
    const skip = (page - 1) * limit 
    const filterJob = {}
    const sortJob = {}

    // // if(req.user){
    // //     filterJob.user = req.user.id
    // }
    if(company){
        filterJob.company = company;
    } if(position){
        filterJob.position = position;
    } if(location) {
        filterJob.location = location;
    }
    
    console.log(filterJob)
    const query = Job.find(filterJob)
    
    if(sort === "company"){
        sortJob.company = company;
    } if(sort === "position") {
        sortJob.position = position
    } if (sort === "location"){
        sortJob.location = location
    }

    sortedQuery = query.collation({locale: 'en', strength: 2}).sort(sortJob)

    
    const job = await sortedQuery.skip(skip).limit(Number(limit));
    let totalJobs = await Job.countDocuments(filterJob);
    const totalPages = Math.ceil(totalJobs / limit)
        
        res.status(200).json({job, currentPage: page, totalPages: totalPages,})
})

// @desc get job
// @route POST /api/job
// @route privee

const getJob = asyncHandler(async (req, res) => {
  const jobId = req.params.id;
  
  if (!mongoose.Types.ObjectId.isValid(jobId)) {

      return res.status(400).json({ message: "Invalid Job ID" });

    }
    
    const job = await Job.findById(jobId);
    if (!job)
      return res.status(404).send("the job with the given id was not found.")
  
    res.status(200).json(job);
});

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
        user: req.user.id,
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
      return res.status(400).json({ message: "error found " });
    }
  });

// @desc updating jobs
// @route PUT /api/jobs/id
// @access private
const updateJob = asyncHandler(async(req, res) => {
  const jobId = req.params.id;
  
  if (!mongoose.Types.ObjectId.isValid(jobId)) {

      return res.status(400).json({ message: "Invalid Job ID" });

    }
    const job = await Job.findById(jobId)
    if(!job) {
        res.status(400)
        throw new Error('job not found')
    }
    
    const jobValidationSchema = Joi.object({
      company: Joi.string(),
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

      const updatedJob = await job.save();

      res.status(200).json(updatedJob);
    } catch (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
})

// @desc delate jobs
// @route delate /api/jobs/id
// @access private
const delateJob = asyncHandler(async(req, res) => {
    const jobId = req.params.id
    if (!mongoose.Types.ObjectId.isValid(jobId)) {

      return res.status(400).json({ message: "Invalid Job Id" });

    }
    const job = await Job.findById(jobId)
    if(!job) {
        res.status(400)
        throw new Error('job not found')
    }
    
    await Job.findByIdAndRemove(jobId);

    res.status(200).json({id: req.params.id})
})

module.exports = {
    getJobs, getJob, setJob, updateJob, delateJob
}