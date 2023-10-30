const express = require('express')
const router = express.Router()
const {registerUser, loginUser, getMe} = require('../controllers/userController')

const {protectSupperAdmin, protectMe} = require('../middleware/authMiddleware')

router.route('/').post(protectSupperAdmin, registerUser)

router.route('/login').post(loginUser)

router.route('/me').get(getMe)



module.exports = router