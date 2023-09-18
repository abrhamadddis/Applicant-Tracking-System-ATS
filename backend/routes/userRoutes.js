const express = require('express')
const router = express.Router()
const {registerUser, loginUser, updateUser, delateUser, getMe} = require('../controllers/userController')

const {protectSupperAdmin} = require('../middleware/authMiddleware')

router.route('/').post(protectSupperAdmin, registerUser)

router.route('/login').post(loginUser)

router.route('/:id').put(protectSupperAdmin, updateUser).delete(protectSupperAdmin, delateUser)

router.route('/me').get(getMe)



module.exports = router