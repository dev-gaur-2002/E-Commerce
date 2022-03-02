const asyncWrapper = (func) =>{
    return async (req,res,next)=>{
        try {
            await func(req,res,next)

        } catch (error) {
            console.log(next(error))
        }
    }
}

module.exports = asyncWrapper