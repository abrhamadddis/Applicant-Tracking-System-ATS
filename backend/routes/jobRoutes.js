const express = require('express')
const router = express.Router()
const {getJobs,getJob, setJob, updateJob, delateJob} = require('../controllers/jobController')


router.route('/').get(getJobs).post(setJob)

router.route('/:id').put(updateJob).delete(delateJob).get(getJob)



module.exports = router