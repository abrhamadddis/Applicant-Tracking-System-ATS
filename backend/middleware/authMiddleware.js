const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

const protectAdmin = asyncHandler(async (req, res, next) => {
    let token
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            // geting token form header
            token = req.headers.authorization.split(' ')[1]
            // verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            // get user form the token
            req.user = await User.findById(decoded.id).select('-password')

            //checking the role
            if (req.user.role === 'candidate'){
                res.status(403);
                throw new Error('Not authorized')
            }
        
            next()
        } catch (error) {
            console.log(error)
            res.status(401)
            throw new Error('Not authorized')
        }
    }

    if(!token) {
        res.status(401)
        throw new Error('Not authotized, no token')
    }

})

const protectSupperAdmin = asyncHandler(async (req, res, next) => {
    let token
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            // geting token form header
            token = req.headers.authorization.split(' ')[1]
            // verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            // get user form the token
            req.user = await User.findById(decoded.id).select('-password')

            //checking the role
            if (req.user.role !== 'superAdmin'){
                res.status(403);
                throw new Error('Not authorized')
            }
        
            next()
        } catch (error) {
            console.log(error)
            res.status(401)
            throw new Error('Not authorized')
        }
    }

    if(!token) {
        res.status(401)
        throw new Error('Not authotized, no token')
    }

})
const protectMe = asyncHandler(async (req, res, next) => {
    let token
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            // geting token form header
            token = req.headers.authorization.split(' ')[1]
            // verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            // get user form the token
            req.user = await User.findById(decoded.id).select('-password')

            //checking the role
            next()
        } catch (error) {
            console.log(error)
            res.status(401)
            throw new Error('Not registered ')
        }
    }

    if(!token) {
        res.status(401)
        throw new Error('Not authotized, no token')
    }

})

module.exports = { protectAdmin, protectSupperAdmin, protectMe }