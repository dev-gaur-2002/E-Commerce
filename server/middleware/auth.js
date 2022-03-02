const jwt = require('jsonwebtoken')
const asyncWrapper = require('../utils/asyncWrapper')
const ErrorHandler = require('../utils/errorhandler')
const User = require('../models/user')


const isAuthenticated = asyncWrapper( async (req,res,next)=>{
    const token  =  req.cookies.token

    if(!token){
        return next(new ErrorHandler("Please login to view this content",401))
    }

    const data = jwt.verify(token,process.env.JWT_SECRET);

    req.user = await User.findById(data.id) // storing data in a params of request
    
    next()
})

const isAdmin = (...roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
            return next(new ErrorHandler(`${roles} required to view this content`,403))
        }
        next()
    }
}

module.exports ={
    isAuthenticated,
    isAdmin
}
