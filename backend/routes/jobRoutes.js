const express = require('express')
const router = express.Router()
const {getJobs,getJob, setJob, updateJob, delateJob} = require('../controllers/jobController')

const {protect} = require('../middleware/authMiddleware')

router.route('/').get(protect, getJobs).post(setJob)

router.route('/:id').put(protect, updateJob).delete( protect, delateJob).get(protect, getJob)



module.exports = router