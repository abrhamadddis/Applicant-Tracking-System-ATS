const express = require('express')
const router = express.Router()
const {regusterUser, loginUser, getMe} = require('../controllers/userController')

router.post('/', regusterUser)
router.post('/login', loginUser)
router.get('/me', getMe)

module.exports = router