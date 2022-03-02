const ErrorHandler = require('../utils/errorhandler')


const errorGernerator = (err,req,res,next)=>{
    err.statusCode = err.statusCode || 500
    err.message = err.message || "internal server error"

    if(err.name === 'CastError'){
        const message = err.message
        err = new ErrorHandler(message,400)
    }

    // duplicate email entered error
    if(err.code === 11000){
        const message = "duplicate email found"
        const err = new ErrorHandler(message,400)
    }

    // wrong JWT entered
    if(err.name === "JsonWebTokenError"){
        const message = "wrong json web token entered"
        const err = new ErrorHandler(message,400)
    }
    
    // expired JWT token
    if(err.name === "TokenExpireError"){
        const message = "the token used is expired"
        const err = new ErrorHandler(message,400)
    }


    return res.status(err.statusCode).json({
        success:false,
        error: err.message
    })
}

module.exports = errorGernerator
