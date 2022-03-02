const userModel = require('../models/user')
const ErrorHandler = require('../utils/errorhandler')
const asyncWrapper = require('../utils/asyncWrapper')
const sendToken = require('../utils/jwtToken')
const sendEmail = require('../utils/sendEmail')
const crypto =  require('crypto')

// register 

const registerUser = asyncWrapper( async (req,res,next)=>{
    const {name,Email,password} = req.body
    const user = await userModel.create({
        name,Email,password,
        avatar:{
            public_id: "this is a sample user id",
            url:"this is a sample url"
        }
    })

    sendToken(user,201,res);
})


// login user 
const loginUser = asyncWrapper(async (req,res,next)=>{
    const {email , password} = req.body 
    // console.log(email , password)
    if(!email || !password){
        return next(new ErrorHandler("Must specify username and password" , 400 ))
    }

    const user = await userModel.findOne({Email:email}).select("+password")
    if(!user){
        return next(new ErrorHandler("invalid email id or password" , 401 ))
    }
    
    const isPasswordMatched = await user.comparePassword(password)

    // console.log(isPasswordMatched)

    if(!isPasswordMatched){
        return next(new ErrorHandler("invalid email id or password" , 401 ))
    }

    sendToken(user,200,res)

})

// logout 
const logoutUser = asyncWrapper(async (req,res,next)=>{

    res.cookie('token',null,{
        expires: new Date(Date.now()),
        httpOnly:true
    })

    res.status(200).json({
        success:true,
        msg:"User logged out"
    })
    
})

// forgot password 
const forgotPassword = asyncWrapper(async(req,res,next)=>{
    const user = await userModel.findOne({Email:req.body.email})

    if(!user){
        return next(new ErrorHandler('No user found with given email id',404))
    }

    const resetToken =  user.getResetPasswordToken()
    await user.save({validateBeforSave : false})

    const resetUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`
    const message = `Your password recovery token is :- \n\n ${resetUrl} \n if not requested for it please ignore`;
    
    try {

        await sendEmail({
            email:user.Email,
            subject:"regarding password recovery",
            message
        })

        res.status(200).json({
            success:true,
            msg:`email sent successfully to ${user.Email}`
        })
        
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;

        await user.save()
        return next( new ErrorHandler(error.message , 500))
    }
})

// reset password

const resetPassword = asyncWrapper( async (req,res,next)=>{
    const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex')
    console.log(hashedToken)

    const user = await userModel.findOne({
        resetPasswordToken:hashedToken,
        resetPasswordExpires:{$gt:Date.now()}
    })

    if(!user){
        return next(new ErrorHandler("Reset password token is invalid or has been expired",400))
    }

    if(req.body.password !== req.body.confirmPassword){
        return next(new ErrorHandler("Password is not matched",400))
    }

    user.password = req.body.password
    user.resetPasswordToken = undefined
    user.resetPasswordExpires = undefined

    await user.save()
    
    sendToken(user,200,res)
}) 

// get account details
const getUserDetails = asyncWrapper( async (req,res,next)=>{
    
    const user = await userModel.findById(req.user.id)
    res.status(200).json({
        success:true,
        user
    })
})

// chnage password
const changePassword = asyncWrapper( async (req,res,next)=>{

    const user = await userModel.findById(req.user.id).select("+password")

    const oldPassword =  req.body.oldPassword

    const isPasswordMatched = user.comparePassword(oldPassword)

    if(!isPasswordMatched){
        return (new ErrorHandler("old password did not matched",401))
    }
    if(oldPassword === req.body.newPassword){
        return (new ErrorHandler("please set a new password",400))
    }
    if(req.body.newPassword !== req.body.confirmPassword){
        return (new ErrorHandler("please set a new password",400))
    }
    user.password = req.body.newPassword
    await user.save()

    sendToken(user,200,res)

})

// update profile
const updateUser = asyncWrapper(async(req,res,next)=>{
    const newData = {
        Email:req.body.email,
        name:req.body.name,
    }

    const user = await userModel.findByIdAndUpdate(req.user.id, newData ,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    })

    res.status(200).json({
        success:true,
        user
    })
})

/* -------------------------- Admin Routes -------------------------- */

// get all users details
const getAllUsers = asyncWrapper( async(req,res,next)=>{
    const user = await userModel.find({})

    res.status(200).json({
        success:true,
        user
    })
})


// get details of a particular user
const getSingleUser = asyncWrapper( async(req,res,next)=>{
    const user = await userModel.findById(req.params.id)

    if(!user){
        return next(new ErrorHandler("invalid Id entered"))
    }

    res.status(200).json({
        success:true,
        user
    })
})

// update a users profile
const updateUserByAdmin = asyncWrapper(async(req,res,next)=>{

    const newData = {
        name:req.body.name,
        Email:req.body.email,
        role:req.body.roles
    }

    const user = await userModel.findByIdAndUpdate(req.params.id , newData , {
        new:true,
        runValidators:true,
        useFindAndModify:false
    })

    if(!user){
        return (new ErrorHandler(`user with id:${req.params.id} does not exists`,400))
    }

    res.status(200).json({
        success:true,
        user
    })
})


// delete a user
const deleteUser = asyncWrapper(async(req,res,next)=>{
    const user = await userModel.findById(req.params.id)

    if(!user){
        return (new ErrorHandler(`user with id:${req.params.id} does not exists`,400))
    }

    await user.remove()

    res.status(200).json({
        success:true,
        message:"User deleted successfully"
    })
})

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    forgotPassword,
    resetPassword,
    getUserDetails,
    changePassword,
    updateUser,
    getAllUsers,
    getSingleUser,
    updateUserByAdmin,
    deleteUser
}
