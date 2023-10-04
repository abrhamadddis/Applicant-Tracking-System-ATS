const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const Joi = require('joi');
const { default: mongoose } = require('mongoose')


// @desc Register new user
// @Route POST /api/users
// @access public

const registerUser = asyncHandler(async(req, res) => {
    const { name, email, password, role, status} = req.body

    if (!name, !email, !password, !role, !status){
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
        role,
        status
    })

    if(user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user.id, user.role),
            role,
            status
        })
    }else{
        res.status(400)
        throw new Error('invalid user data')
    }
    
    
})

// @desc updating a user
// @route GET /api/users/id
// @access private

const updateUser = asyncHandler(async(req, res) =>{
    const userId = req.params.id;

    if(!mongoose.Types.ObjectId.isValid(userId)){
        return res.status(400).json({message: "Invalid user ID"})
    }
    const user = await User.findById(userId)
    if(!user){
        res.status(400)
        throw new Error('user is not found')
    }
    
    user.name = req.body.name || user.name;
    user.email= req.body.email || user.email;

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    user.password = hashedPassword || user.password
    user.role = req.body.role || user.role
    user.status= req.body.status || user.status

    const updatedUser = await user.save();
    console.log(updatedUser)
    const {password, ...updatedWithOutPassWord} = updatedUser.toObject()


    res.status(200).json(updatedWithOutPassWord)
})

// @desc delate a user
// @Route DELETE /api/users/:id
// @access private

const delateUser = asyncHandler(async(req, res)=>{
    const userId = req.params.id
    if(!mongoose.Types.ObjectId.isValid(userId)){
        return res.status(400).json({message: "Invalid user Id"})
    }
    
    const user = await User.findById(userId)
    if(!user) {
        res.status(400)
        throw new Error('user nor found')
    }

    await User.findByIdAndRemove(userId);

    res.status(200).json({id: req.params.id})
})


// @desc get a users
// @Route Get /api/users
// @access private

const getUsers = asyncHandler(async(req, res)=> {
    let {page, limit, role, sort} = req.query
    limit = Number(limit) || 2
    page = Number(page) || 1
    const skip = (page - 1) * limit 
    const filteredUser = {}
    const sortUser = {}

    if(role){
        filteredUser.role = role;
    }

    const query = User.find(filteredUser).select("-password")

    if(sort === "name"){
        sortUser.name = name
    }

    sortedQuery = query.sort(sortUser)

    const user = await sortedQuery.skip(skip).limit(Number(limit));
    let totalUsers = await  User.countDocuments(filteredUser);
    const totalPages = Math.ceil(totalUsers / limit)

    res.status(200).json({user, currentPage: page, totalPages: totalPages})
})

// @desc get a user by id 
// @route Get /api/user/:id
// @route private

const getUser = asyncHandler (async(req, res) => {
    const userId = req.params.id;

    if(!mongoose.Types.ObjectId.isValid(userId)){
        return res.status(400).json({message: "Invalid user ID"});
    }
    const user = await User.findById(userId).select("-password");

    if(!user) {
        return res.status(404).send("the user with the given id was not found")

    }
    res.status(200).json(user)
})



// @desc Authenticte a user
// @Route POST /api/users/login
// @access private

const loginUser = asyncHandler(async(req, res) => {
    const { email, password} = req.body

    //check for user email
    const user = await User.findOne({email})

    if(user && (await bcrypt.compare(password, user.password))){
        if(user.status === "inactive"){
            res.status(401)
            throw new Error('you are account is inactive ') 
        }
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

//

// @desc Get user data
// @Route POST /api/users/me
// @access private

const getMe = asyncHandler(async(req, res) => {
    const { _id, name, email, role, status} = await User.findById(req.user.id)

    res.status(200).json({
        id: _id,
        name,
        email,
        role,
        status
    })
})

// Generate JWT

const generateToken = (id, role) => {
    return jwt.sign( { id, role }, process.env.JWT_SECRET, {expiresIn: '30d',})
}

module.exports = {
    registerUser,
    loginUser,
    getUsers,
    getUser,
    updateUser,
    delateUser,
    getMe,
}