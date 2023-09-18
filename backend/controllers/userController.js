const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')


// @desc Register new user
// @Route POST /api/users
// @access public

const regusterUser = asyncHandler(async(req, res) => {
    const { name, email, password, role} = req.body

    if (!name, !email, !password, !role){
        res.status(400)
        throw new Error('please add all the fields')
    }
    // check if the user exists
    
    const userExists = await User.findOne({email})

    if(userExists){
        res.status(400)
        throw new Error('User already exists')
    }

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // create user
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        role
    })

    if(user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user.id, user.role),
            role
        })
    }else{
        res.status(400)
        throw new Error('invalid user data')
    }
    
    
})

// @desc Authenticte a user
// @Route POST /api/users/login
// @access public

const loginUser = asyncHandler(async(req, res) => {
    const { email, password} = req.body

    //check for user email
    const user = await User.findOne({email})

    if(user && (await bcrypt.compare(password, user.password))){
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user.id, user.role)
        })
    } else{
        res.status(400)
        throw new Error('Invalid credentials')
    }
    
})

// @desc Get user data
// @Route POST /api/users/me
// @access private

const getMe = asyncHandler(async(req, res) => {
    const { _id, name, email} = await User.findById(req.user.id)

    res.status(200).json({
        id: _id,
        name,
        email,
    })
})

// Generate JWT

const generateToken = (id, role) => {
    return jwt.sign( { id, role }, process.env.JWT_SECRET, {expiresIn: '30d',})
}

module.exports = {
    regusterUser,
    loginUser,
    getMe,
}