const express = require('express')
const router = express.Router()
const {getJobs,getJob, setJob, updateJob, delateJob} = require('../controllers/jobController')

const {protectAdmin} = require('../middleware/authMiddleware')

router.route('/').get(getJobs).post(protectAdmin, setJob)

router.route('/:id').put(protectAdmin, updateJob).delete( protectAdmin, delateJob).get(getJob)



module.exports = router