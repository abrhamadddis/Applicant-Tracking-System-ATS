const express = require('express')
const router = express.Router()
const {getJobs, setJob, updateJob, delateJob} = require('../controllers/jobController')


router.route('/').get(getJobs).post(setJob)

router.route('/:id').put(updateJob).delete(delateJob)



module.exports = router